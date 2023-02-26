const mongoose = require("mongoose");

const UserModel = mongoose.Schema(
    {
        emailAddress: { type: String },
        password: { type: String },
        name: { type: String },
        Date: {
            type: Date,
            default: Date.now
        }
    }
)

const ResumeUser = mongoose.model('UserModel', UserModel)
module.exports = ResumeUser