const express = require("express")
const ticketController = require("../Controller/ticket")

require("dotenv").config()

const ticketRouter = express.Router()


ticketRouter.post('/create', ticketController.createticket)
ticketRouter.patch('/manage/:id', ticketController.updateTickets)
ticketRouter.get('/info/:id', ticketController.getTicketInfo)
ticketRouter.post('/checkout/:id', ticketController.checkoutTicket)
ticketRouter.delete('/delete/:id', ticketController.deleteTickets)

module.exports = ticketRouter