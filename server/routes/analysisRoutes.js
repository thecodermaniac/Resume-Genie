import { Router } from "express";
import { pdfUpload } from "../utils/pdfUpload.js";
import { analyzeResume } from "../services/resume/analyzeResume.js";

const router = Router();

router.post(
  "/resume/analyse",
  pdfUpload.single("resume"),
  async (req, res) => {
    try {
      const jobDescription = req.body.jobDescription;
      if (!req.file || !jobDescription) {
        return res.status(400).json({
          message: "PDF resume file and job description are required"
        });
      }

      
      const result = await analyzeResume(req.file.path, jobDescription);
      res.json(result);
    } catch (err) {
      res.status(400).json({
        message: err.message || "Failed to analyze resume"
      });
    }
  }
);

export default router;
