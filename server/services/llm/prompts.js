import { ChatPromptTemplate } from "@langchain/core/prompts";

export const BUILD_RESUME_PROMPT = ChatPromptTemplate.fromMessages([
  ["system", "You are a professional resume writer. Be realistic and concise."],
  ["human", "{input}"]
]);

export const RESUME_CHAT_PROMPT = ChatPromptTemplate.fromMessages([
  ["system", "Answer strictly from the given resume. Do not guess."],
  ["human", "Resume:\n{resume}\n\nQuestion:\n{question}"]
]);


export const RESUME_ANALYSIS_PROMPT = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are an experienced technical recruiter reviewing a resume. "
    + "Provide a factual, neutral evaluation without guessing or adding information."
  ],
  [
    "human",
    "Resume:\n{resume}\n\n"
    + "Analyze the resume and respond using the following structure:\n"
    + "1. Overall Summary (2 to 3 sentences)\n"
    + "2. Key Strengths (bullet points)\n"
    + "3. Areas for Improvement (bullet points)\n"
    + "4. Role Fit (what roles this profile suits)\n"
  ]
]);