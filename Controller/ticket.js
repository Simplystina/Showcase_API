const TicketModel = require("../Model/ticket")
require("dotenv").config()
const crypto = require("crypto")
const PaymentDetailsModel = require("../Model/payment_details")
const axios = require("axios")
const TicketTransactionModel = require("../Model/ticket_transactions")


exports.createticket = async(req,res)=>{
    try {
        const data = req.body
        const {event_id} = req.query
        if(!event_id){
            return res.status(404).json({message:"Pass the event Id as a query parameter", status:true, data:null})
        }
        data.event_id = event_id
        const eventData = await TicketModel.create(data)
        return res.status(200).json({
            message: "Ticket created for this event successfully",
            status: "true",
           data: eventData
        })
    } catch (error) {
        console.log(error, "Error")
        res.status(404).json({message:"Invalid validation of fields", status:true, data:null})
    }
}


exports.updateTickets = async(req,res)=>{
    try {
        const data = req.body
        const {id} = req.query
        const result = await TicketModel.findByIdAndUpdate(id, data, {new:true})
        return res.status(200).json({message:"Ticket has been updated successfully", status: true, data: result})
    } catch (error) {
        
    }
}

exports.getTicketInfo = async(req, res)=>{
    try {
        const {id} = req.params
        const data = await TicketModel.findById(id)
        return res.status(201).json({message:"Successfully retrieved the ticket", status: true, data: data})
    } catch (error) {
        console.log(error)
    }
}



exports.checkoutTicket = async(req,res)=>{

    const{id} = req.params

    const ticketInfo = await TicketModel.findById(id)
    
    console.log(ticketInfo)
    if(!ticketInfo){
        return res.status(404).json({message:"The ticket doesn't exist",status:true, data:null})
    }
     if(ticketInfo.ticket_type ==="free"){
        return res.status(404).json({message:"You can't pay for this event because it is a free event"})
     }
    const transactionParams = {
        email: req.user.email,
        amount: ticketInfo.amount , // amount in kobo
      };

      const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      };
      
    try {
      
     const response = await axios.post('https://api.paystack.co/transaction/initialize',    transactionParams, { headers })
    
    // Do something with the transaction details
    
   const result = await TicketTransactionModel.find({ticket_id: id})
  
    const get = {
        email: req.user.email,
        status: "pending",
        amount: ticketInfo.amount,
        ticket_id:id,
        reference: response.data.data.reference,
        access_code: response.data.data.access_code
    }
    console.log(get,result);
    //const data = await TicketTransactionModel()
     return res.status(201).json({"message":"Authorization url for payment created successfully", status:true, data:response.data})
    } catch (error) {
        console.log(error,"an error occurred")
    }
}


exports.deleteTickets = (req,res)=>{
    try {
        const {id} = req.params
        const result = TicketModel.findByIdAndDelete(id)
        return res.status(201).json({message:"Successfully deleted this event",data:null, status: true})
    } catch (error) {
        
    }
}