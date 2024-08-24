
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    productimage:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
    },
    messname:{
        type:String,
        required:true
    }
})

const productModel = mongoose.model("productmodel",productSchema);
module.exports = productModel

