import { getLLM } from "../llm/llmClient.js";
import { RESUME_CHAT_PROMPT } from "../llm/prompts.js";

export async function chatResume({ resumeText, question }) {
  const llm = getLLM();
  const chain = RESUME_CHAT_PROMPT.pipe(llm);

  const result = await chain.invoke({
    resume: resumeText,
    question
  });

  return {
    answer: result.content
  };
}