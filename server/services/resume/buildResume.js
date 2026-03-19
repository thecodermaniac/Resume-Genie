import { getLLM } from "../llm/llmClient.js";
import { RESUME_BUILD_JSON_PROMPT } from "../llm/prompts.js";
import { extractJson } from "../../utils/extractJson.js";

export async function buildResume(data) {
  const llm = getLLM();
  const chain = RESUME_BUILD_JSON_PROMPT.pipe(llm);
  const isExperienced = data.resumeType === "experienced";

  const result = await chain.invoke({
    resumeType: data.resumeType,
    name: data.fullName,
    role: data.currentPosition,
    experienceYears: data.experienceYears,
    workHistory: JSON.stringify(data.workHistory),
    // Pass empty array for experienced — prompt will also be told to omit it
    projects: isExperienced ? "[]" : JSON.stringify(data.projects ?? []),
    education: JSON.stringify(data.education),
    skills: data.skills.join(", "),
  });

  const parsed = extractJson(result.content);

  // Hard-delete projects from the response for experienced resumes
  // regardless of what the LLM returned
  if (isExperienced) {
    delete parsed.projects;
  }

  return parsed;
}
