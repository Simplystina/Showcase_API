const express = require("express")
const ticketController = require("../Controller/ticket")

require("dotenv").config()

const ticketRouter = express.Router()



module.exports = ticketRouter