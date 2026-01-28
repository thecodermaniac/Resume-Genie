export function extractJson(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid LLM output");
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No valid JSON object found in LLM output");
  }

  const jsonString = text.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error("Failed to parse extracted JSON");
  }
}