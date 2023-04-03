const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const TicketTransactionsModel = new mongoose.Schema(
    {
        id: ObjectId,
        first_name: {type:String},
        last_name: {type: String},
        email: {type:String},
        fee: {type:Number},
        status: {type:String},
        amount: {type:Number},
        no_of_purchase: {type:Number},
        ticket_id: {type:String},
        
    },
    {
      timestamps: true, toJSON: {virtuals: true}
    })


const TicketTransactions = mongoose.model('ticket_transactions', TicketTransactionsModel)

module.exports = TicketTransactions