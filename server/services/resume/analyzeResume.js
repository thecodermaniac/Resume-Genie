import { extractPdfText } from "../../utils/pdfParser.js";
import { cleanupFile } from "../../utils/cleanupFile.js";
import { getLLM } from "../llm/llmClient.js";
import { RESUME_ANALYSIS_JSON_PROMPT } from "../llm/prompts.js";

export async function analyzeResume(filePath, jobDescription = "") {
  try {
    const hasJobDescription = Boolean(jobDescription && jobDescription.trim());
    const resumeText = await extractPdfText(filePath);
    const llm = getLLM();

    const chain = RESUME_ANALYSIS_JSON_PROMPT.pipe(llm);

    const result = await chain.invoke({
      resume: resumeText.slice(0, 6000),
      jobDescription: hasJobDescription
        ? jobDescription
        : "__NO_JOB_DESCRIPTION_PROVIDED__",
    });

    // Parse JSON safely
    const parsed = JSON.parse(result.content);
    if (!hasJobDescription) {
      parsed.jobMatch.matchScore = 0;
      parsed.jobSpecificScore.score = 0;
    }
    return parsed;
  } catch (err) {
    throw new Error("Failed to analyze resume");
  } finally {
    cleanupFile(filePath);
  }
}
