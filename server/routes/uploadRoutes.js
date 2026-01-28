import { Router } from "express";
import { buildResume } from "../services/resume/buildResume.js";

const router = Router();

router.post("/resume/create", async (req, res, next) => {
  try {
    const {
      fullName,
      currentPosition,
      experienceYears,
      techStack,
      workHistory
    } = req.body;

    if (!fullName || !currentPosition) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const resume = await buildResume({
      fullName,
      currentPosition,
      experienceYears,
      techStack,
      workHistory
    });

    res.json(resume);
  } catch (err) {
    next(err);
  }
});

export default router;
