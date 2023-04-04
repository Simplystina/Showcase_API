const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const TicketModel = new mongoose.Schema(
    {
        id: ObjectId,
        description: {type:String, required:true},
        name: {type:String, required:true},
        location_tip: {type:String},
        ticket_type: {type:String, default:"free", enum:["free", "paid","inviteOnly"]},
        stock: {type:String, default:"limited_stock", enum:["limited_stock","unlimited_stock"]},
        no_of_stock: {type:Number},
        purchase_limit: {type:Number, required:true},
        price: {type:String},
        event_id: {type:String},
        no_of_purchase: {type:Number},
    },
    {
      timestamps: true, toJSON: {virtuals: true}
    })


const Tickets = mongoose.model('tickets', TicketModel)

module.exports = Tickets