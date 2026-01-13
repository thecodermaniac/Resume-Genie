import { ChatPromptTemplate } from "@langchain/core/prompts";

export const BUILD_RESUME_PROMPT = ChatPromptTemplate.fromMessages([
  ["system", "You are a professional resume writer. Be realistic and concise."],
  ["human", "{input}"]
]);

export const RESUME_CHAT_PROMPT = ChatPromptTemplate.fromMessages([
  ["system", "Answer strictly from the given resume. Do not guess."],
  ["human", "Resume:\n{resume}\n\nQuestion:\n{question}"]
]);
