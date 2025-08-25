import { EventEmitter } from  "events";
//import {subject} from "./sendEmail.js";
import sendEmail, { subject } from "./sendEmail.js";
import { signUp } from "./generateHTML.js";
import { generateToken } from "../token/token.js";
 

  export const emailEmitter = new EventEmitter();
 
  emailEmitter.on("sendEmail",async(userName,email)=>{
  const token =generateToken({payload:{email},signature:process.env.TOKEN_SECRET_EMAIL})
  const link = `http://localhost:3000/auth/activate_account/${token}`;
  const isSent=await sendEmail({to:email,subject:subject.register,html:signUp(link,userName)})
   
  
 if (!isSent) throw new Error("Email Not Sent");
  })

 