const express = require("express");
const router = express.Router();
const path = require("path");
const openai = require("../openAI/openapi");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "pdfUploads");
    if (!fs.existsSync("pdfUploads")) {
      fs.mkdirSync('pdfUploads')
    }
    
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
});

router.post("/resume/analyse", upload.single("pdffile"), async (req, res) => {
  try {
    console.log(req.file.filename);
    console.log(path.join("pdfUploads", req.file.filename));
    var pathvalue = path.join("pdfUploads", req.file.filename);
    let dataBuffer = fs.readFileSync(pathvalue);
    pdf(dataBuffer).then(function (data) {
      // console.log(data.text)

      // openai code goes here

      openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: "Give me review of this resume: " + data.text,
          max_tokens: 1000,
          temperature: 0,
        })
        .then((response) => {
          console.log(response?.data?.choices?.[0]?.text);
          return response?.data?.choices?.[0]?.text;
        })
        .then((answer) => {
          const array = answer
            ?.split("\n")
            .filter((value) => value)
            .map((value) => value.trim());

          return array;
        })
        .then((answer) => {
          console.log(answer);
          res.json({
            answer: answer,
          });
        })
        .catch((error) => {
          res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
          });
        });
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
