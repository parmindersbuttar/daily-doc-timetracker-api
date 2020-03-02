const nodemailer = require("nodemailer");
const uuid = require("uuid");

const mailService = () => {
    const sendEmail = async (url, user) => {
        const resetToken = uuid.v4();
        const transporter = await nodemailer.createTransport({
          service: "gmail",
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAILID,
            pass: process.env.EMAILPASSWORD
          }
        });
    
        const result = await transporter.sendMail({
          from: `"Scotty Lefkowitz" ${process.env.EMAILID}`,
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
