const express = require("express");
const router = express.Router();
const path = require("path");
const openai = require('../openAI/openapi')
const multer = require("multer");
const fs = require('fs')
const pdf = require('pdf-parse')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pdfUploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage
});


router.post("/resume/analyse", upload.single("pdffile"), async (req, res) => {
    console.log(req.file.filename);
    console.log(path.join('pdfUploads', req.file.filename));
    var pathvalue = path.join('pdfUploads', req.file.filename)
    let dataBuffer = fs.readFileSync(pathvalue);
    pdf(dataBuffer).then(function (data) {
        console.log(data.text)

        // openai code goes here
    });
})

module.exports = router;