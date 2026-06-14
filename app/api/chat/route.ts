import { convertToModelMessages, streamText, UIMessage, tool, InferUITools, UIDataTypes, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";
// import { googleSearch } from "@ai-sdk/google@latest/tools";

const tools = {
  searchKnowledgeBase: tool({
    description: "Search the knowledge base for relevant documents",
    inputSchema: z.object({
      query: z.string().describe("The search query to find relevant documents"),
    }),
    execute:async ({ query }) => {
      try{
        const results = await searchDocuments(query, 3, 0.5);

        if(results.length === 0) {
          return "No relevant documents found in the knowledge base.";
        }

        const formattedResults = results.map((r, i) => `[${i + 1}] ${r.content}`).join("\n\n");

        return formattedResults;
      }catch(error) {
        console.log("Search error:", error);
        return "Enter searching the Knowledge Base.";
      }
    },
  })

   // ✅ Google's built-in web search tool
  // googleSearch: google.tools.googleSearch(),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try{
    const { messages }: {messages: ChatMessage[]} = await req.json();

    const result = streamText({
      model: google('gemini-2.5-flash'),
      //added await
      messages: await convertToModelMessages(messages),
      tools,
      system: "You are a helpful assistant for answering questions based on the provided knowledge base. Use the searchKnowledgeBase tool to find relevant information when needed always search before answering if the question might relate to the uploaded documents. But if answer can't be found in the knowledge base, then anwer the question but specify that the answer was not fron the knowledge base",
      // Base your answers solely on the search results and do not make up information. If the search results do not contain the answer, respond with 'I couldn't find relevant information in the knowledge base.'. 
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch(error) {
    console.log("Error in chat route completion:", error);
    return new Response("Error to stream chat completion", { status: 500 });
  }
}
