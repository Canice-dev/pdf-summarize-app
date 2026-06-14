import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"


export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 150,    //500 in production for larger chunking
  chunkOverlap: 20,
  separators: [" "],
});


export async function chunkContent(content:string) {
  return await textSplitter.splitText(content.trim());
}
