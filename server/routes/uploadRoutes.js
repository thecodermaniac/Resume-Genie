import { Router } from "express";
import { buildResume } from "../services/resume/buildResume.js";

const router = Router();

router.post("/resume/create", async (req, res, next) => {
  try {
    const result = await buildResume(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
