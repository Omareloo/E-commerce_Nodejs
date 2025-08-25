import Joi from "joi";
import { generalField } from "../../MiddleWare/validation.js";

export const registerSchema = Joi.object({
  userName: generalField.userName.required(),
  email: generalField.email.required(),
  password: generalField.password.required(),
  confirmpassword:generalField.confirmpassword.required(),
  phoneNumber:generalField.phoneNumber.required(),
  role:generalField.role,
  id:generalField.id,
  
}) 

export const loginSchema = Joi.object({
 email:  generalField.email.required(),
 password: generalField.password.required(),
  }) 
