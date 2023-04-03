const express = require("express")
const authController = require("../Controller/auth")

require("dotenv").config()

const authRouter = express.Router()



authRouter.post('/signup', authController.register)
authRouter.post('/login', authController.login)

module.exports = authRouter