const EventModel = require("../Model/events")
const TicketModel = require("../Model/ticket")

exports.addEvent = async(req,res)=>{
    try {
        const data = req.body
      
        data.userid = req.user.userid 

        const eventData = await EventModel.create(data)
        return res.status(200).json({
            message: "Event created successfully",
            status: "true",
           data: eventData
        })
    } catch (error) {
        console.log(error, "Error")
        res.status(400).json({message:"Invalid validation of fields", status:true, data:null})
    }
}

    


exports.getAllEvents = async(req,res)=>{
    try {
        const userId = req.user.userid
        console.log(userId, "userId")

        const result = await EventModel.find()  

        res.status(200).json({message:"Successfully retrieved all Events on Showcase", status: true, data: result})
    } catch (error) {
        
    }
}
exports.getAllEventTickets = async(req,res)=>{
    try {
        const userId = req.user.userid
        console.log(userId, "userId")

        const result = await TicketModel.find()  

        res.status(200).json({message:"Successfully retrieved all Tickets on Showcase", status: true, data: result})
    } catch (error) {
        
    }
}

exports.getAnEvents = async(req,res)=>{
    try {
        const {id} = req.params
        const userId = req.user.userid
        console.log(userId, "userId")

        const result = await EventModel.find({_id: id})  

        res.status(200).json({message:"Successfully retrieved Event", status: true, data: result})
    } catch (error) {
        
    }
}

exports.updatesAnEvents = async(req,res)=>{
    try {
        const {id} = req.params
      
        const data = req.body

        const result = await EventModel.findByIdAndUpdate(id, data,{new:true})  
      
       return res.status(200).json({message:"Event has been updated successfully", status: true, data: result})
    } catch (error) {
        
    }
}

exports.deleteEvent = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await EventModel.findByIdAndDelete(id)
        res.status(200).json({message:"Event has been deleted successfully", status: true, data: result})
    } catch (error) {
        
    }
}
