import { ChatPromptTemplate } from "@langchain/core/prompts";

export const RESUME_BUILD_JSON_PROMPT = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a professional resume writer. " + "Return ONLY valid JSON.",
  ],
  [
    "human",
    `
Resume Type: {resumeType}

Name: {name}
Role: {role}
Experience: {experienceYears} years

Work History:
{workHistory}

IMPORTANT:
For each work entry include:
- company
- role
- duration
- responsibilities (as bullet list array)

Projects:
{projects}

IMPORTANT:
For each project entry include:
- name
- tech stack
- features (as bullet list array)

Education:
{education}
IMPORTANT:
For each education entry include:
- degree
- institution
- duration

Skills:
{skills}

If resumeType is 'experienced':
- Generate a strong executive and professional summary based on work experience. Highlight leadership, impact, and strategic contributions. Focus on achievements and results.
- For work history, emphasize scope of responsibility, team size, and impact. Include quantifiable achievements where possible.
- ignore projects unless they are highly relevant or impactful. Focus on work experience and skills.

If resumeType is 'junior':
- Keep summary short, neutral and professional. Avoid using the word junior in the summary. Focus on skills, education and any relevant projects or internships.
- For work history, focus on responsibilities and any measurable impact. Include internships, part-time jobs, or volunteer work if relevant.
- For projects, highlight technical skills used and any tangible outcomes or features built.

Return JSON in this format:


{{
  "profile": {{
    "name": "",
    "role": "",
    "experienceYears": 0
  }},
  "summary": "",
  "skills": [],
  "experience": [],
  "projects": [],
  "education": []
  }}
`,
  ],
]);

export const RESUME_CHAT_PROMPT = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a resume assistant. " +
      "Answer strictly from the provided resume. " +
      "Return plain text only. " +
      "Do NOT return HTML. " +
      "Do NOT return markdown code blocks. " +
      "Do NOT include <div>, <html>, or any markup.",
  ],
  ["human", "Resume:\n{resume}\n\nQuestion:\n{question}"],
]);

export const RESUME_ANALYSIS_JSON_PROMPT = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are an ATS system and an experienced technical recruiter. " +
      "Analyze resumes factually and conservatively. " +
      "Do NOT guess missing information. " +
      "Do NOT add skills or experience not explicitly present.",
  ],
  [
    "human",
    `
Resume:
{resume}

Job Description:
{jobDescription}

Return ONLY valid JSON in the exact structure below.
Do NOT include markdown, comments, or explanations outside JSON.

{{
  "summary": "",
  "strengths": [],
  "improvements": [],
  "roleFit": [],

  "atsScore": {{
    "score": 0,
    "reasoning": ""
  }},

  "seniority": {{
    "level": "Junior | Mid | Senior",
    "reasoning": ""
  }},

  "jobMatch": {{
    "matchScore": 0,
    "matchedSkills": [],
    "missingSkills": []
  }},

  "jobSpecificScore": {{
    "score": 0,
    "criticalGaps": [],
    "reasoning": ""
  }},

  "resumeRewriteSuggestions": [
    {{
      "section": "",
      "suggestion": ""
    }}
  ],

  "pdfAnnotations": [
    {{
      "section": "",
      "comment": ""
    }}
  ]
}}

Rules and Evaluation Criteria:

ATS Scoring:
- Score must be between 0 and 100
- Weight core technical skills higher than secondary skills
- Clear skill sections and structured experience increase score
- Quantified impact increases score
- Vague or generic descriptions reduce score

Seniority Estimation:
- Base decision on years of experience, role scope, and responsibility
- Use only: Junior, Mid, Senior
- If unclear, choose the lower level and explain why

Job Description Matching:
- Identify skills explicitly present in both resume and job description
- matchScore reflects similarity only (not suitability)
- If no job description is provided, matchScore must be 0

Job-Specific Scoring:
- Infer must-have vs nice-to-have skills from the job description
- Missing must-have skills significantly reduce score
- Nice-to-have skills provide minor positive impact
- Score reflects suitability for THIS job, not general quality

If Job Description is "__NO_JOB_DESCRIPTION_PROVIDED__", then:
- jobMatch.matchScore must be 0
- matchedSkills must be an empty array
- missingSkills must be an empty array
- jobSpecificScore.score must be 0
- criticalGaps must be an empty array
- reasoning must clearly state "No job description provided"

Resume Rewrite Suggestions:
- Provide concrete, actionable improvements
- Reference specific resume sections (e.g., Skills, Experience)
- Do NOT rewrite the full resume

PDF Annotations:
- Provide comment-style suggestions only
- Reference logical sections (e.g., Summary, Skills, Experience)
- Do NOT modify or rewrite the document

Important:
- Output must be valid JSON
- Arrays must never be null
- Scores must be integers
`,
  ],
]);
