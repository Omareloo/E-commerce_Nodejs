import jwt from "jsonwebtoken";
import UserModel from "../../DataBase/models/userModel.js";
import { verifyToken } from "../utils/token/token.js";
import CatchError from "../utils/CatchAyncError.js";
import { AppError } from "../utils/CreateError.js";

export const  rolesType ={
  User:"User",
  Admin:"Admin",
};

export const authuntcation = CatchError(async(req,res, next)=>{
   
    const { authorization } = req.headers;
    if(!authorization){
         return next(new AppError("unauthorized",401));
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
 
      return next(new AppError("Invalid payload",500));
    }
    // const user =await UserModel.findById(decoded.id).select("-password")
        const user =await UserModel.findById(decoded.id) 

    if(!user){
     return next(new AppError("Register first",404));
    }
    if (user?.changedAt && decoded?.iat) {
      if (user.changedAt.getTime() > decoded.iat * 1000) {
        return next(new AppError("Token expired, please login again", 401));
      }
    }
    req.user=user
return next()
   
}
)
export const AllowTo=(roles=[])=>{
  return async(req,res,next)=>{
    try {
      if(!roles.includes(req.user.role))
        return next(new AppError("forbidden Account",403));
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
