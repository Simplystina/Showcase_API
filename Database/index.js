const mongoose = require("mongoose")
require("dotenv").config()


const url = process.env.DATABASE_URL


const connect =()=>{
    mongoose.connect(url || 'mongodb://localhost:27017')

    mongoose.connection.on("connected",()=>{
        console.log("Connected to MongoDb Successfully")
    })

    mongoose.connection.on("error",(error)=>{
        console.log(error, "error")
        console.log("An error occurred while connecting to Mongodb")
    })
}

module.exports = {connect}