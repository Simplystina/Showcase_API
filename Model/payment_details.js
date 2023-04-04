const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const PaymentDetailsModel = new mongoose.Schema(
    {
        id: ObjectId,
        token: {type:String, required:true},
        user_id: {type:String, required:true},
        key:{type:Object},
        iv:{type: Object }
    },
    {
      timestamps: true, toJSON: {virtuals: true}
    })


const PaymentDetails = mongoose.model('payment_details', PaymentDetailsModel)

module.exports = PaymentDetails