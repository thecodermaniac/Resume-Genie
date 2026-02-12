import { extractPdfText } from "../../utils/pdfParser.js";
import { cleanupFile } from "../../utils/cleanupFile.js";
import { getLLM } from "../llm/llmClient.js";
import { RESUME_ANALYSIS_JSON_PROMPT } from "../llm/prompts.js";

export async function analyzeResume(filePath, jobDescription = "") {
  const hasJobDescription = Boolean(jobDescription && jobDescription.trim());

  try {
    const resumeText = await extractPdfText(filePath);
    const llm = getLLM();
    const chain = RESUME_ANALYSIS_JSON_PROMPT.pipe(llm);

    const result = await chain.invoke({
      resume: resumeText.slice(0, 6000),
      jobDescription: hasJobDescription
        ? jobDescription
        : "__NO_JOB_DESCRIPTION_PROVIDED__",
    });

    const safeJSON = extractJSON(result.content);
    const parsed = JSON.parse(safeJSON);

    if (!hasJobDescription) {
      parsed.jobMatch = parsed.jobMatch || {};
      parsed.jobSpecificScore = parsed.jobSpecificScore || {};
      parsed.jobMatch.matchScore = 0;
      parsed.jobSpecificScore.score = 0;
    }

    return parsed;

  } catch (err) {
    console.error("ANALYZE ERROR:", err);
    throw err;
  } finally {
    cleanupFile(filePath);
  }
}

function extractJSON(text) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("Invalid JSON response from LLM");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}
