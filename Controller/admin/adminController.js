const adminDb = require("../../Model/admin/adminModel");
const cloudinary = require("../../cloudinary/cloudinary");
const userDb = require("../../Model/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "djshdi";


const Register = async(req,res)=>{

    
    try {
        const {name,email,mobile,password,confirmpassword} = req.body;

        if(!name || !email || !password || !confirmpassword || !mobile){
            return res.status(400).json({error:"all fields are required"})
        }

        const adminvalid = await adminDb.findOne({email});
        const mobilevalid = await adminDb.findOne({mobile});

        if(adminvalid){
           return res.status(400).json("admin is alreday an axist")
        }

        if(mobilevalid){
          return res.status(400).json({error:"mobile number is already an use"})
        }

        if(password !==confirmpassword){
            return res.status(400).json({error:"both passwords does not matched"})
        }else{

           const file = req.file?.path;
           const uploads = await cloudinary.uploader.upload(file);

           const newadmin = new adminDb({
            name,email,password,mobile,profile:uploads.secure_url
           })

           await newadmin.save();

           res.status(200).json(newadmin)

        }
        
    } catch (error) {
        console.log(error);
    }

}

const Login = async(req,res)=>{

  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Both fields are required" });
    }

    const validadmin = await adminDb.findOne({ email });
    if (!validadmin) {
        return res.status(400).json({ error: "Please register first" });
    }

    const validpassword = await bcrypt.compare(password, validadmin.password);
    console.log('Password comparison result:', validpassword);

    if (!validpassword) {
        return res.status(400).json({ error: "Password is incorrect" });
    }

    const token = await validadmin.generateToken();
    const result = {
        validadmin,
        token
    };

    res.status(200).json(result);
} catch (error) {
    console.error('Error during login process:', error);
    res.status(500).json({ error: "Internal Server Error" });
}

    

}

const adminverify = async(req,res)=>{

    try {

        const validadmin = await adminDb.findOne({_id:req.userId});
        
        if(validadmin){
            res.status(200).json(validadmin)
        }else{
            res.status(400).json({error:"invalid admin"})
        }
        
    } catch (error) {
        console.log(error);
    }

}


const Logout = async(req,res)=>{


    try {
        
        req.rootUser.tokens = req.rootUser.tokens.filter((element)=>{
            return req.rootUser.tokens !== req.token
        })

        await req.rootUser.save();

        res.status(200).json("user is logout")

    } catch (error) {
        
    }
 
}

const getallusers = async(req,res)=>{
try {
    
    const users = await userDb.find({});
    res.status(200).json(users)

} catch (error) {
    console.log(error);
}

}

const deleteuser = async(req,res)=>{

    
    try {
        const {userId} = req.params;
        const deleteuser = await userDb.findByIdAndDelete({_id:userId});
        res.status(200).json(deleteuser)
        
    } catch (error) {
        console.log(error);
    }

}






module.exports = {Register,Login,adminverify,Logout,getallusers,deleteuser};





