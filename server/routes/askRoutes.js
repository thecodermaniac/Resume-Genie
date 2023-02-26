const express = require("express");
const router = express.Router();
const openai = require("../openAI/openapi");
const Chat = require("../models/chatModel");

router.post("/chat", async (req, res) => {
  try {
    const { question, email } = req.body;

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
        if (email != null) {
          new Chat({
            emailAddress: email,
            userchat: question,
            botchat: answer[0],
          }).save();
        }
        res.json({
          answer: answer,
          prompt: question,
        });
      })
      .catch((error) => {
        res.status(error.statusCode || 500).json({
          success: false,
          message: error.message,
        });
      });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }

  //   console.log({ question });
});

router.get("/getChats", async (req, res) => {
  try {
    const { email } = req.body;
    if (email == null) {
      res.status(200);
    } else {
      let chatlist = await Chat.find({ emailAddress: email });
      res.json({
        list: chatlist,
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
