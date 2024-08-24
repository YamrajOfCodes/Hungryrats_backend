const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const messagemodel = mongoose.model("messagemodel",messageSchema);
module.exports= messagemodel