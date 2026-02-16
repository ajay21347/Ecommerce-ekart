import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfiguration = {
    from: "process.env.MAIL_USER",
    to: email,

    //Subject of Email
    subject: "Email Verification",

    //This would be the text of email body
    text: `Hi There, You have recently visited out website and entered email.Please follow the given link to verify your email http://localhost:5173/verify/${token} Thanks`,
  };

  transporter.sendMail(mailConfiguration, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
