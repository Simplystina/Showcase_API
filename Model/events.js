const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const EventModel = new mongoose.Schema(
    {
        id: ObjectId,
        name:{type:String, required: true},
        description: {type:String, required: true},
        location: {type:String},
        location_tip: {type:String},
        event_type: {type:String, enum:["virtual","physical"]},
        virtual_meet_link: {type:String},
        category: {type:String},
        custom_url: {type:String},
        frequency: {type:String},
        startDate: {type:Date, required: true},
        startTime: {type:String},
        endDate: {type:Date, required: true},
        endTime:{type:String},
        twitterUrl: {type:String},
        facebookUrl: {type:String},
        instagramUrl: {type:String},
        userid: {type:String}
    },
    {
      timestamps: true, toJSON: {virtuals: true}
    })


const Events = mongoose.model('events', EventModel)

module.exports = Events