const express = require("express")
const userController = require("../Controller/user")

require("dotenv").config()

const userRouter = express.Router()



userRouter.get('/profile', userController.getUserProfile)
userRouter.patch('/update', userController.updateEmail)
userRouter.post('/billing/add',userController.addBillings)
userRouter.get("/billing", userController.getPaymentDetails)
userRouter.delete('/delete', userController.deleteDetails)
userRouter.get('/events', userController.getEvents)


module.exports = userRouter