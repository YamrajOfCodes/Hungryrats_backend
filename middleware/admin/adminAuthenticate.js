const SECRET_KEY = "djshdi";
const jwt = require("jsonwebtoken")

const adminDb = require("../../Model/admin/adminModel");

const adminauthenticate = async(req,res,next)=>{
  
    const token = req.headers.authorization;
    
    const verifyToken = jwt.verify(token,"djshdi");
    
    const rootUser = await adminDb.findOne({_id:verifyToken._id});
    
    if(!rootUser){throw new Error("user not found")}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id

    next();

   
} 



module.exports = adminauthenticate