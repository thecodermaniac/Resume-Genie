const express = require("express");
const router = express.Router();
const openai = require('../openAI/openapi')

router.post("/chat", (req, res) => {
    try {
        const question = req.body.question;

        openai
            .createCompletion({
                model: "text-davinci-003",
                prompt: question,
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
                res.json({
                    answer: answer,
                    prompt: question,
                });
            }).catch((error) => {
                res.status(error.statusCode || 500).json({
                    success: false,
                    message: error.message,
                });
            })
    } catch (error) {

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }


    //   console.log({ question });
});


module.exports = router