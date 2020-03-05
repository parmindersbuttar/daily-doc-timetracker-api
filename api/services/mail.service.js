const nodemailer = require("nodemailer");
const uuid = require("uuid");

const mailService = () => {
    const sendEmail = async (url, user) => {
      console.log(process.env.EMAIL_ID, process.env.EMAIL_PASSWORD);
        const resetToken = uuid.v4();
        const transporter = await nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
          }
        });
    
        const result = await transporter.sendMail({
          from: `"Scotty Lefkowitz" ${process.env.EMAIL_ID}`,
          to: user.email,
          subject: "Reset Password Email",
          text: resetToken,
          html: `
            <b><a href='${url}/reset-password/${resetToken}'>Click here to Reset Password</a></b>
          `
        });
    
        return result;
      };
      return {
        sendEmail
      };
}


module.exports = mailService;
