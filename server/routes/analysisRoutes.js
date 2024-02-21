import { Router } from "express";
const router = Router();
import axios from "axios";
import env from "dotenv";
env.config();
import multer, { diskStorage } from "multer";
import path from "path";
import { existsSync, mkdirSync, readFileSync, unlinkSync } from "fs";
import pdf from "pdf-parse-fork";

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pdfUploads");
    if (!existsSync("pdfUploads")) {
      mkdirSync("pdfUploads");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
});

function createText(resumeText) {
  let tempArr = resumeText
    ?.split("\n")
    .filter((value) => value.length >= 4)
    .map((value) => value.trim());
  return tempArr.join(" ");
}

router.post("/resume/analyse", upload.single("pdffile"), async (req, res) => {
  try {
    var pathvalue = path.join("pdfUploads", req.file.filename);
    let dataBuffer = readFileSync(pathvalue);
    const pdfData = await pdf(dataBuffer);
    const question = `Give me review of this resume: '${createText(
      pdfData.text
    )}' `;
    unlinkSync(pathvalue);
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        inputs: question,
        parameters: {
          temperature: 1,
          max_new_tokens: 200,
          return_full_text: false,
          max_time: 10,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGFACE_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "sent",
      {
        inputs: question,
        parameters: {
          temperature: 1,
          max_new_tokens: 200,
          return_full_text: false,
          max_time: 10,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGFACE_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data[0].generated_text;

    res.json({
      answer: createText(answer),
      prompt: question,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
