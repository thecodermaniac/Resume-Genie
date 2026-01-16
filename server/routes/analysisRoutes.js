import { Router } from "express";
import { pdfUpload } from "../utils/pdfUpload.js";
import { analyzeResume } from "../services/resume/analyzeResume.js";

const router = Router();

router.post(
  "/resume/analyse",
  pdfUpload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "PDF resume file is required"
        });
      }

      const result = await analyzeResume(req.file.path);

      res.json(result);
    } catch (err) {
      res.status(400).json({
        message: err.message || "Failed to analyze resume"
      });
    }
  }
);

export default router;
