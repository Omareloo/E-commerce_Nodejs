import joi from "joi";
import { generalField } from "../../MiddleWare/validation.js";


export const updateProfileSchema=joi.object({
    userName:generalField.userName,
    email:generalField.email,
    phone:generalField.phoneNumber
}).required();

export const changepasswordschema=joi.object({
    oldpassword:generalField.password.required(),
    password:generalField.password.not(joi.ref("oldpassword")).required(),
    confirmpassword:generalField.confirmpassword.required()

}).required()

 
