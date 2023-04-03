const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const TicketModel = new mongoose.Schema(
    {
        id: ObjectId,
        description: {type:String},
        name: {type:String},
        location_tip: {type:String},
        ticket_type: {type:String},
        stock: {type:String},
        no_of_stock: {type:String},
        purchase_limit: {type:String},
        price: {type:String},
        event_id: {type:Date},
    },
    {
      timestamps: true, toJSON: {virtuals: true}
    })


const Tickets = mongoose.model('tickets', TicketModel)

module.exports = Tickets