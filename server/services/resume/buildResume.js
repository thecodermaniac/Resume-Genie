import { getLLM } from "../llm/llmClient.js";
import { RESUME_BUILD_JSON_PROMPT } from "../llm/prompts.js";
import { extractJson } from "../../utils/extractJson.js";

export async function buildResume(input) {
  const llm = getLLM();
  const chain = RESUME_BUILD_JSON_PROMPT.pipe(llm);

  const result = await chain.invoke({
    name: input.fullName,
    role: input.currentPosition,
    experience: input.experienceYears,
    techStack: input.techStack,
    workHistory: JSON.stringify(input.workHistory, null, 2)
  });

  return extractJson(result.content);
}
