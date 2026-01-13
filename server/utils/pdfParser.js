import pdf from "pdf-parse-fork";
import { readFileSync } from "fs";

export async function extractPdfText(filePath) {
  const buffer = readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text.replace(/\s+/g, " ").trim();
}
