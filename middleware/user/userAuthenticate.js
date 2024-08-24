
const userDb = require("../../Model/user/userModel");
const USER_SECRET="sdasd"
const jwt = require("jsonwebtoken");

const userauthenticate = async(req,res,next)=>{

  
  
  try {
    const token = req.headers.authorization;
    
    const verifyToken = jwt.verify(token,USER_SECRET);
    
    const rootUser = await userDb.findOne({_id:verifyToken._id});
   
  

    
    if(!rootUser){
      throw new Error("user not found")
    }else{

      
      req.token = token
      req.rootUser = rootUser
      req.userId = rootUser._id
      req.userMainId = rootUser.id
      
      next();
    }

} catch (error) {
    res.status(400).json({error:"Unauthorized No token Provide"})
}
}

module.exports = userauthenticate