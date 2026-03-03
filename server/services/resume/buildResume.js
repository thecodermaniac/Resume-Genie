import { getLLM } from "../llm/llmClient.js";
import { RESUME_BUILD_JSON_PROMPT } from "../llm/prompts.js";
import { extractJson } from "../../utils/extractJson.js";

export async function buildResume(data) {
  const llm = getLLM();
  const chain = RESUME_BUILD_JSON_PROMPT.pipe(llm);
  console.log(data.resumeType);
  
   const result = await chain.invoke({
    resumeType: data.resumeType,
    name: data.fullName,
    role: data.currentPosition,
    experienceYears: data.experienceYears,
    workHistory: JSON.stringify(data.workHistory),
    projects: JSON.stringify(data.projects),
    education: JSON.stringify(data.education),
    skills: data.skills.join(", "),
  });

  return extractJson(result.content);
}
