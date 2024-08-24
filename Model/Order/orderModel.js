const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    messname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

const orderModel = mongoose.model("orderSchema",orderSchema);
module.exports = orderModel