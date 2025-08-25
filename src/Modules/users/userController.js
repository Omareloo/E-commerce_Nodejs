import UserModel from "../../DB/models/user.model.js"
import jwt from"jsonwebtoken"
import CryptoJS  from "crypto-js"
import { asyncHandler } from "../../utils/Asynchandler.js"
import { decrypt } from "../../utils/encryption/encryption.js"
export const getprofile =async(req,res,next)=>{
    try {
      const{user}=req
     // const { id } = req.params; // Get ID from URL params (e.g., `/profile/:id`)
        
        // Find user by ID
      //   const userbyid = await UserModel.findById(id);
        
      //   if (!userbyid) {
      //       return next(new Error("User not found", { cause: 404 }));
      //   }
user.phoneNumber=decrypt({encrypted:user.phoneNumber,signature:process.env.Encryption_Secret})
 
       return res.status(200)
       .json({success:true,message:"Done",user})
    } catch (error) {
       return next(error) 
    }
   } ;
   export const updateProfile=asyncHandler(async(req,res,next)=>{
      
   }

   )
