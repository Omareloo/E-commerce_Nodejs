import UserModel from "../../../DataBase/models/userModel.js"
import bcrypt  from "bcrypt"
import CryptoJS  from "crypto-js"
import jwt from"jsonwebtoken"
import { rolesType } from "../../MiddleWare/auth.middleware.js"
import { emailEmitter } from "../../utils/email/emailEvents.js"; 
import { asyncHandler } from "../../utils/error-handling/Asynchandler.js"
import { encrypt } from "../../utils/encryption/encryption.js"
import { generateToken, verifyToken } from "../../utils/token/token.js"
import { hashing ,compare} from "../../utils/hashing/hashing.js"
 

export const register =asyncHandler(async(req,res,next)=>{
  
const{userName,email,password,confirmpassword,phoneNumber,role}=req.body
if(password!==confirmpassword){
   return next(new Error("password doesnt match",{cause:404}));
}


const checkEmail =await UserModel.findOne({email})
if(checkEmail){
   return next(new Error("this mail is already exist",{cause:409}));
}


const hashpassword= hashing({plainText:password , saltRound:process.env.SALT})
const encryptphone=encrypt({plainText:phoneNumber,signature:process.env.Encryption_Secret})
 

const user = await UserModel.create({userName,email,password:hashpassword ,phoneNumber:encryptphone,role})
emailEmitter.emit("sendEmail",user.userName,user.email)
    return res.status(201)
    .json({success:true,message:"user created successfully",user})
  
}) 

export const login =asyncHandler(async(req,res,next)=>{
    
const{ email,password}=req.body
 
const user =await UserModel.findOne({email})
if(!user)
 {
   return  next(new Error("this user is not exist!",{cause:404}));
}  
if(user.confirmEmail===false){
 return next(new Error("please confirm your Email",{cause:404})); 
} 
const matchpassword =compare({plainText:password ,hash:user.password})

if(!matchpassword){
 return  next(new Error("this password is not correct ",{cause:404}));
}

const token = generateToken({payload:{ id:user.id, isloggedIn:true},
                             signature: user.role === rolesType.User?
 process.env.TOKEN_SECRET_USER:process.env.TOKEN_SECRET_ADMIN ,
  options:{ expiresIn: 60 * 60 }})

return res.status(201)
    .json({success:true,message:"Done  ",token})
 
}) 



export const activate_account=async(req,res,next)=>{
   
      const {token} =req.params
      const {email} =verifyToken({token:token ,signature:process.env.TOKEN_SECRET_EMAIL})
      const user =await UserModel.findOne({email})
      if(!user){
         return  next(new Error("this user is not exist",{cause:404}));
      }
      user.confirmEmail=true
      await user.save();
      
      
      
      
      return res
      .status(200)
      .json({success:true,message:"User confirmed Successfully  "})
    
}