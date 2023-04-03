const UserModel = require("../Model/user")
const bcrypt = require("bcryptjs")
require("dotenv").config()
const crypto = require('crypto');
const PaymentDetailsModel = require("../Model/payment_details")
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


exports.updateEmail = async(req,res)=>{
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

    try {
        const cardInfo = req.body;
        // Convert card information to JSON string
        const cardInfoString = JSON.stringify(cardInfo);

        // Encrypt card information using AES-256 encryption in CBC mode
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(cardInfoString, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        console.log(`Encrypted card info: ${encrypted}`);
        const data = await PaymentDetailsModel.create({
            token:encrypted,
            user_id:req.user.userid
        })
        res.status(201).json({message:"Payment Details Added successfully", status:true, data:data})
    } catch (error) {
        
    }
}

exports.getPaymentDetails = async()=>{

}

exports.deleteDetails = async()=>{

}

exports.getEvents = async()=>{

}