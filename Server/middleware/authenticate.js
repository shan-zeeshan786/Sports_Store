const jwt=require("jsonwebtoken")
const mongoose = require('mongoose')
const express=require("express")
const app = express();
app.use(express.json());
require("../Schema/Users_data");


const User = mongoose.model("Users_data");

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const Authenticate=async(req,res,next)=>{
   
  
    try {
        const token=req.cookies.jwtoken;
        
         const VerifyToken=jwt.verify(token,"QWERTYUIOPLKJHGFDSAZXCVBNMLKJHGF");

         const rootUser=await User.findOne({_id:VerifyToken._id,"Tokens.token":token})
        
        if(!rootUser){
            console.log("User not")
            throw new Error('User not Found')
        }

        req.token=token;
        req.rootUser=rootUser;
        req._id=rootUser._id;
        next();
        } catch (error) {
        res.status(401).send('Unauthorized: No token provided')
    }
}
module.exports=Authenticate;