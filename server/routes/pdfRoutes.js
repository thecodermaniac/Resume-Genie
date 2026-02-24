import { Router } from "express";
import { renderLatex } from "../services/latex/renderLatex.js";
import { compileLatex } from "../services/latex/compileLatex.js";

const router = Router();

router.post("/resume/pdf", async (req, res) => {
  try {
    const texPath = renderLatex(req.body);

    const pdfPath = await compileLatex(texPath);

    res.sendFile(pdfPath, { root: process.cwd() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF generation failed" });
  }
});

export default router;