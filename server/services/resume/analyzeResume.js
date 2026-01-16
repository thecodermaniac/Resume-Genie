import { extractPdfText } from "../../utils/pdfParser.js";
import { cleanupFile } from "../../utils/cleanupFile.js";
import { getLLM } from "../llm/llmClient.js";
import { RESUME_ANALYSIS_PROMPT } from "../llm/prompts.js";
// import { TOKENS } from "../llm/tokenConfig.js";

export async function analyzeResume(filePath) {
  try {
    const resumeText = await extractPdfText(filePath);

    const llm = getLLM();
    const chain = RESUME_ANALYSIS_PROMPT.pipe(llm);

    const response = await chain.invoke({
      resume: resumeText.slice(0, 5000)
    });

    return {
      analysis: response.content
    };
  } finally {
    cleanupFile(filePath);
  }
}
