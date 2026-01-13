import { ChatGroq } from "@langchain/groq";

let llmInstance = null;

export function getLLM() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY missing when initializing LLM");
  }

  if (!llmInstance) {
    console.log("Initializing LLM client... OK");

    llmInstance = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      maxTokens: 800
    });
  }

  return llmInstance;
}
