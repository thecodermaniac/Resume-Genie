const ResumeUser = require('../models/userModels')
const express = require("express");
const router = express.Router();

router.post('/signRegister', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existinguser = await ResumeUser.findOne({ emailAddress: email })
        if (existinguser) {
            throw {
                statusCode: 400,
                message: "User already exists"
            }

        };
        const newUser = await new ResumeUser({
            emailAddress: email,
            password: password,
            name: name,
        }).save()
        res.status(200).json({
            success: true,
            user: newUser
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
})

router.post('/signIn', async (req, res) => {
    try {
        const { email, password } = req.body
        const Loggeduser = await ResumeUser.findOne({ emailAddress: email })
        if (!Loggeduser) {
            throw {
                statusCode: 400,
                message: "Need to Register First"
            }
        }
        if (Loggeduser.password != password) {
            throw {
                statusCode: 700,
                message: "Wrong Password"
            }
        }
        res.status(200).json({
            success: true,
            user: Loggeduser
        })
    } catch (error) {

    }


})

module.exports = router;