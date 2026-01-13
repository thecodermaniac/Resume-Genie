import { getLLM } from "../llm/llmClient.js";
import { RESUME_CHAT_PROMPT } from "../llm/prompts.js";

export async function chatResume({ resumeText, question }) {
  const llm = getLLM();
  const chain = RESUME_CHAT_PROMPT.pipe(llm);

  const result = await chain.invoke({
    resume: resumeText.slice(0, 5000),
    question
  });

  return { answer: result.content };
}
