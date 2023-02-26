const mongoose = require("mongoose");

const ChatModel = mongoose.Schema(
    {
        emailAddress: { type: String },
        userchat: { type: String },
        botchat: { type: String },
        Date: {
            type: Date,
            default: Date.now
        }
    }
)

const Chat = mongoose.model('ChatModel', ChatModel)
module.exports = Chat;