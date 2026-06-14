import { NextRequest } from "next/server";
import pdf from "@cedrugs/pdf-parse";
import { chunkContent } from "@/lib/chunking";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
// import { sql } from "drizzle-orm";


// Helper to encode a progress/status event as a newline-delimited JSON line
function encode(data: object): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(data) + "\n");
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("pdf") as File | null;

  if (!file) {
    return new Response(JSON.stringify({ error: "No file provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // ── Step 1: Parse PDF ──────────────────────────────────────────────
        controller.enqueue(
          encode({ stage: "parsing", message: "Reading PDF…", percent: 0 })
        );

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const data = await pdf(buffer);

        if (!data.text || data.text.trim().length === 0) {
          controller.enqueue(
            encode({ stage: "error", error: "No text found in the PDF." })
          );
          controller.close();
          return;
        }

        // ── Step 2: Chunk ──────────────────────────────────────────────────
        controller.enqueue(
          encode({ stage: "chunking", message: "Splitting into chunks…", percent: 5 })
        );

        const chunks = await chunkContent(data.text);

        controller.enqueue(
          encode({
            stage: "chunking",
            message: `${chunks.length} chunks created. Starting embeddings…`,
            percent: 10,
          })
        );

        // ── Step 3: Embed ──────────────────────────────────────────────────
        // Embedding progress maps to 10–90% of the total bar
        const EMBED_START = 10;
        const EMBED_END = 90;

        const embeddings = await generateEmbeddings(
          chunks,
          ({ chunksProcessed, totalChunks, estimatedSecondsRemaining }) => {
            const embedFraction = totalChunks > 0 ? chunksProcessed / totalChunks : 0;
            const percent = Math.round(
              EMBED_START + embedFraction * (EMBED_END - EMBED_START)
            );

            const mins = Math.floor(estimatedSecondsRemaining / 60);
            const secs = Math.round(estimatedSecondsRemaining % 60);
            const timeLabel =
              estimatedSecondsRemaining <= 0
                ? "Almost done…"
                : mins > 0
                ? `~${mins}m ${secs}s remaining`
                : `~${secs}s remaining`;

            controller.enqueue(
              encode({
                stage: "embedding",
                message: `Embedding chunks… (${chunksProcessed}/${totalChunks}) · ${timeLabel}`,
                percent,
              })
            );
          }
        );

        // ── Step 4: Store ──────────────────────────────────────────────────
        controller.enqueue(
          encode({ stage: "storing", message: "Saving to database…", percent: 92 })
        );

        const records = chunks.map((chunk, i) => ({
          content: chunk,
          embedding: embeddings[i],
        }));

        //Add this — wipes all previous chunks before saving new ones
        await db.delete(documents);

        //to reset the id
        // await db.execute(sql`TRUNCATE TABLE documents RESTART IDENTITY`);


        await db.insert(documents).values(records);

        // ── Done ───────────────────────────────────────────────────────────
        controller.enqueue(
          encode({
            stage: "done",
            message: `${records.length} chunks saved successfully.`,
            percent: 100,
          })
        );
      } catch (err) {
        console.error("[upload] processing error:", err);
        controller.enqueue(
          encode({ stage: "error", error: "Failed to process PDF file." })
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
