import { Router } from "express";
import { pdfUpload } from "../utils/pdfUpload.js";
import { extractPdfText } from "../utils/pdfParser.js";
import { cleanupFile } from "../utils/cleanupFile.js";
import { chatResume } from "../services/resume/chatResume.js";

const router = Router();

/* -------------------------------
   1️⃣  Parse Resume
-------------------------------- */

router.post("/resume/parse", pdfUpload.single("resume"), async (req, res, next) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required"
      });
    }

    filePath = req.file.path;

    const resumeText = await extractPdfText(filePath);

    res.json({
      resumeText: resumeText.slice(0, 8000) // safety cap
    });

  } catch (err) {
    next(err);
  } finally {
    if (filePath) cleanupFile(filePath);
  }
});


/* -------------------------------
   2️⃣  Resume Q&A
-------------------------------- */

router.post("/resume/chat", async (req, res, next) => {
  try {
    const { resumeText, question } = req.body;
    console.log("Received chat request:", { resumeTextLength: resumeText?.length, question });
    if (!resumeText || !question) {
      return res.status(400).json({
        message: "resumeText and question are required"
      });
    }

    const result = await chatResume({
      resumeText: resumeText.slice(0, 6000), // token guard
      question
    });

    res.json(result);

  } catch (err) {
    next(err);
  }
});

export default router;