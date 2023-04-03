const express = require("express")
const cors = require("cors")
const {connect} = require("./Database")
const auth = require("./Middleware/auth")
const bodyParser = require("body-parser")


require("dotenv").config()

//import Routers
const authRouter = require("./Router/auth")
const userRouter = require("./Router/user")
const eventRouter = require("./Router/event")

const PORT = process.env.PORT || 3334
connect()

const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


app.options('*', cors()); // preflight OPTIONS; put before other routes
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/auth', authRouter)
app.use('/users', auth, userRouter)
app.use('/events',auth, eventRouter)

app.get('/',(req,res)=>{
    res.status(200).send({message:"Home Route",status:true})
})

app.use("*",(req,res)=>{
    return res.status(404).json({message:"route not found"})
})

app.listen(PORT, ()=>{
    console.log("Server is listening at ",PORT)
})