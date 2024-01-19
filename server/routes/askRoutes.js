import { Router } from "express";
const router = Router();
import axios from "axios";
import env from "dotenv";
env.config();

router.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        inputs: question,
        parameters: {
          temperature: 1.0,
          max_new_tokens: 800,
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
    const array = answer
      ?.split("\n")
      .filter((value) => value.length >= 4)
      .map((value) => value.trim());

    res.json({
      answer: array,
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
