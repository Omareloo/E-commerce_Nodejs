import nodemailer from  "nodemailer"
const sendEmail = async({to,subject,html})=>{


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass:  process.env.PASS,
  },
    tls: {
            rejectUnauthorized: false,
          },

});

  const info = await transporter.sendMail({
    from: '"Ecommerce  👻" <process.env.EMAIL>', // sender address
    to , // list of receivers
    subject , // Subject line
    html , // html body
  });
  return info.rejected.length === 0 ? true :false;
  

} ;
export const subject ={
    register:"Acctivate Account",
    resetPassword:"Reset Password"
};
export default sendEmail;