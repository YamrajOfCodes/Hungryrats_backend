const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const USER_SECRET="sdasd"


const userSchema = new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }

    next();
})

userSchema.methods.generateToken=async function(req,res){
    try {
     const newtoekn=jwt.sign({_id:this._id},USER_SECRET,{
       expiresIn:"1d"
     });
     this.tokens=this.tokens.concat({token:newtoekn})
     await this.save();
     return newtoekn
   
    } catch (errors) {
    console.log(errors);
    }
   }

   const userModel = mongoose.model("userSchema",userSchema);
   module.exports = userModel;

