const express = require("express")
const eventController = require("../Controller/event")

require("dotenv").config()

const eventRouter = express.Router()



eventRouter.post('/create', eventController.addEvent)
eventRouter.get('/explore', eventController.getAllEventTickets)
eventRouter.get('/explore/:id', eventController.getAnEvents)
eventRouter.patch('/manage/:id', eventController.updatesAnEvents)
eventRouter.delete('/delete/:id', eventController.deleteEvent)



module.exports = eventRouter