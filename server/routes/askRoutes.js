const express = require("express");
const router = express.Router();
const openai = require('../openAI/openapi')

router.post("/chat", (req, res) => {
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
        });

    //   console.log({ question });
});


module.exports = router