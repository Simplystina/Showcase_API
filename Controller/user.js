const UserModel = require("../Model/user")
const bcrypt = require("bcryptjs")
require("dotenv").config()
const crypto = require('crypto');
const PaymentDetailsModel = require("../Model/payment_details")
const TicketModel = require("../Model/ticket")
const EventModel = require("../Model/events")
const TicketTransactionModel = require("../Model/ticket_transactions")


const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY)

exports.getUserProfile = async (req,res)=>{
    try {
        
       
        const user = await UserModel.findById(req.user.userid)
        userData = user.toObject();
    
       
        //console.log(token,"tokennnnnnnnnn", user, user.firstName)
        //Delete the password from the object so as not to display the hash to the user
        delete userData.password;
       
        return res.status(201).json({
            message:"User retrieved successfully", status:true, 
            data:userData})
    } catch (error) {
        console.log(error,"error")
    }
}


exports.updateUserDetails = async(req,res)=>{
    try {
        const {email,pwd} = req.query
        console.log(email, "emailllllllllllllll")
        let data =  {}

        if(email){
            data.email = email
        }
        if(pwd){
           
            const hash = await bcrypt.hash(pwd, 10)
            data.password = hash

        }

        const updatedData = await UserModel.findByIdAndUpdate(req.user.userid, data, {new:true})
        return res.status(201).json({
            message:"User details updated successfully", status:true, 
            data:updatedData})

    } catch (error) {
        console.log(error.keyPattern.email, "error")
        if(error.keyPattern.email){
            return res.status(404).json({
                data: null,
                message: "Email already exist, please use a unique email address",
                success: false,
                error: {}
              })
        }
    }
}


exports.addBillings = async(req,res)=>{
    // Generate encryption key and initialization vector (IV)
    const key = crypto.randomBytes(32); // 256-bit key for AES-256 encryption
    const iv = crypto.randomBytes(16); // 128-bit IV for AES-256 encryption in CBC mode
    console.log(typeof key,iv, "key and iv")
    try {


        const {cardNumber, cardExpiry, cardCVC}=cardInfo = req.body;


        if(!(cardNumber && cardExpiry && cardCVC)){
            return res.status(404).json({status:true, message:"Please fill all fields", data:null})
        }

        //delete users old payment info
        const result = await PaymentDetailsModel.deleteMany({user_id: req.user.userid})
        // Convert card information to JSON string
        const cardInfoString = JSON.stringify(cardInfo);

        // Encrypt card information using AES-256 encryption in CBC mode
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(cardInfoString, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        console.log(`Encrypted card info: ${encrypted}`);
        const data = await PaymentDetailsModel.create({
            token:encrypted,
            user_id:req.user.userid,
            key:key.toString('hex'),
            iv:iv.toString('hex')
        })
        res.status(201).json({message:"Payment Details Added successfully", status:true, data:data})
    } catch (error) {
        
    }
}


const decryptCardInfo = (encrypted, key, iv)=>{
    
    // Decrypt card information using AES-256 encryption in CBC mode
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

   // Convert decrypted JSON string back to object
   const decryptedCardInfo = JSON.parse(decrypted);
    return decryptedCardInfo

}
exports.getPaymentDetails = async(req,res)=>{
     try {
        const encrypted = await PaymentDetailsModel.find({user_id: req.user.userid})
        console.log(encrypted)
        const key = Buffer.from(encrypted[0].key, 'hex');
        const iv = Buffer.from(encrypted[0].iv, 'hex');
        const result = decryptCardInfo(encrypted[0].token,key, iv)
        console.log(result,"result")
         return res.status(200).json({message:"Users Payment Details retrieved successfully", status:true, data:result })
     } catch (error) {
        console.log(error)
     }
}

exports.deleteDetails = async(req,res)=>{
     try {
        const id = req.user.userid
        const deleteUser = await  UserModel.findByIdAndDelete(id)
        const deletePaymentDetails = await  PaymentDetailsModel.deleteMany({user_id:id})

        const event = await EventModel.find({userid: id})
        console.log(event,"event model")
        const deleteEvents = await EventModel.deleteMany({userid:id})


        const ticket = await TicketModel.find({event_id: event[0]?._id})
         console.log(ticket)
         const deleteTickets = await TicketModel.deleteMany({event_id:event[0]?._id})
        
        const ticketTrans = await  TicketTransactionModel.deleteMany({ticket_id:ticket[0]?._id})

        
        res.status(201).json({message:"Users details deleted successfully", status:true, data:null })
       
     } catch (error) {
        console.log(error,"error")
     }
}

exports.getEvents = async(req,res)=>{
    try {
        const data = await EventModel.find({userid: req.user.userid })

        return res.status(201).json({message:"Successfully retrieved all events", status: true, data: data})
    } catch (error) {
        
    }
}


/*
 const encrypted = await PaymentDetailsModel.find({user_id: req.user.userid})
    const key = Buffer.from(encrypted[0].key, 'hex');
    const iv = Buffer.from(encrypted[0].iv, 'hex');
*/