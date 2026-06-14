import { google } from "@ai-sdk/google";
import { embed, embedMany } from "ai";

const EMBEDDING_MODEL = google.textEmbeddingModel("gemini-embedding-001");

// Gemini free tier: 100 requests/min. We use 90 as a safe buffer.
const BATCH_SIZE = 90;

// 62 seconds: 2s above the 60s rate-limit window as a safety buffer.
const RATE_LIMIT_DELAY_MS = 62_000;

export type EmbeddingProgressCallback = (progress: {
  batchIndex: number;    // 0-based current batch
  totalBatches: number;  // total number of batches
  chunksProcessed: number;
  totalChunks: number;
  estimatedSecondsRemaining: number;
}) => void;

/** Waits for a given number of milliseconds. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Extracts the retry delay in ms from a Gemini 429 error body, or returns a default. */
function parseRetryDelayMs(error: unknown): number {
  try {
    const body =
      (error as { responseBody?: string })?.responseBody ?? "";
    const match = body.match(/"retryDelay":\s*"(\d+(?:\.\d+)?)s"/);
    if (match) return Math.ceil(parseFloat(match[1])) * 1000 + 2_000; // +2s buffer
  } catch {
    // ignore parse errors
  }
  return RATE_LIMIT_DELAY_MS;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const input = text.replace(/\n/g, " ");

  const { embedding } = await embed({
    model: EMBEDDING_MODEL,
    value: input,
  });

  return embedding;
}

export async function generateEmbeddings(
  texts: string[],
  onProgress?: EmbeddingProgressCallback
): Promise<number[][]> {
  const inputs = texts.map((t) => t.replace(/\n/g, " "));
  const allEmbeddings: number[][] = [];

  const totalBatches = Math.ceil(inputs.length / BATCH_SIZE);

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const start = batchIndex * BATCH_SIZE;
    const batch = inputs.slice(start, start + BATCH_SIZE);

    // Report progress before processing this batch
    onProgress?.({
      batchIndex,
      totalBatches,
      chunksProcessed: start,
      totalChunks: inputs.length,
      estimatedSecondsRemaining:
        (totalBatches - batchIndex) * (RATE_LIMIT_DELAY_MS / 1000),
    });

    let attempts = 0;
    const MAX_ATTEMPTS = 2;

    while (attempts < MAX_ATTEMPTS) {
      try {
        const { embeddings } = await embedMany({
          model: EMBEDDING_MODEL,
          values: batch,
        });

        allEmbeddings.push(...embeddings);
        break; // success — exit retry loop
      } catch (error) {
        attempts++;
        const isRateLimited =
          (error as { statusCode?: number })?.statusCode === 429;

        if (isRateLimited && attempts < MAX_ATTEMPTS) {
          // Parse the retry delay Gemini tells us, then wait it out
          const waitMs = parseRetryDelayMs(error);
          console.warn(
            `[embeddings] Rate limited on batch ${batchIndex + 1}/${totalBatches}. ` +
            `Waiting ${waitMs / 1000}s before retry...`
          );
          await delay(waitMs);
        } else {
          // Non-429 error, or exhausted retries — rethrow
          throw error;
        }
      }
    }

    // Wait between batches (skip the wait after the final batch)
    const isLastBatch = batchIndex === totalBatches - 1;
    if (!isLastBatch) {
      console.log(
        `[embeddings] Batch ${batchIndex + 1}/${totalBatches} done. ` +
        `Waiting ${RATE_LIMIT_DELAY_MS / 1000}s before next batch...`
      );
      await delay(RATE_LIMIT_DELAY_MS);
    }
  }

  // Final progress report — 100% done
  onProgress?.({
    batchIndex: totalBatches,
    totalBatches,
    chunksProcessed: inputs.length,
    totalChunks: inputs.length,
    estimatedSecondsRemaining: 0,
  });

  return allEmbeddings;
}