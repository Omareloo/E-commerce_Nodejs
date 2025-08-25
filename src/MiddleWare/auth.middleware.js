import jwt from "jsonwebtoken";
import UserModel from "../../DataBase/models/userModel.js";
import { verifyToken } from "../utils/token/token.js";

export const  rolesType ={
  User:"User",
  Admin:"Admin",
};

export const authuntcation =async(req,res, next)=>{
  try {
    const { authorization } = req.headers;
    if(!authorization){
        return next(new Error("unauthorized",{cause:401}));
    }
  const[Bearer,token]=authorization.split(" ")
  let TOKEN_SIGNATURE = undefined ;
  switch (Bearer) {
    case "Bearer":
      TOKEN_SIGNATURE=process.env.TOKEN_SECRET_USER
      break;
      case "Admin":
      TOKEN_SIGNATURE=process.env.TOKEN_SECRET_ADMIN
      break;
      default:
      break;
  }

  
    const decoded=verifyToken({token:token,signature:TOKEN_SIGNATURE}) 
    if(!decoded?.id){
      return next(new Error("Invalid payload",{cause:500}));
    }
    const user =await UserModel.findById(decoded.id).select("-password")
    if(!user){
     return next(new Error("Register first",{cause:404}));
    }
    req.user=user
return next()
  } catch (error) {
    return next(error);
  }
}

export const AllowTo=(roles=[])=>{
  return async(req,res,next)=>{
    try {
      if(!roles.includes(req.user.role))
        return next(new Error("forbidden Account",{cause:403}));
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
