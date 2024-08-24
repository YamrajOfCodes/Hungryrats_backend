const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "djshdi";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


adminSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

adminSchema.methods.generateToken=async function(req,res){
    try {
     const newtoekn=jwt.sign({_id:this._id},SECRET_KEY,{
       expiresIn:"1d"
     });
     this.tokens=this.tokens.concat({token:newtoekn})
     await this.save();
     return newtoekn
   
    } catch (errors) {
    console.log(errors);
    }
   }
   

   const adminmodel = mongoose.model("adminschema",adminSchema);
   module.exports =adminmodel