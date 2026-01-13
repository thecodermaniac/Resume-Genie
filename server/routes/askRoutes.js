import { Router } from "express";
import multer from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";

import { extractPdfText } from "../utils/pdfParser.js";
import { cleanupFile } from "../utils/cleanupFile.js";
import { chatResume } from "../services/resume/chatResume.js";

const router = Router();

/* ---------- Multer setup ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync("pdfUploads")) {
      mkdirSync("pdfUploads");
    }
    cb(null, "pdfUploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

/* ---------- Route ---------- */
router.post(
  "/resume/chat",
  upload.single("resume"),
  async (req, res) => {
    let filePath;

    try {
      const { question } = req.body;

      if (!req.file || !question) {
        return res.status(400).json({
          message: "Resume file and question are required"
        });
      }

      filePath = req.file.path;

      const resumeText = await extractPdfText(filePath);

      const result = await chatResume({
        resumeText,
        question
      });

      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: err.message || "Failed to process resume query"
      });
    } finally {
      if (filePath) cleanupFile(filePath);
    }
  }
);

export default router;
