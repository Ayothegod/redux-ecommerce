import { log } from "console";
import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SENDER_ADDRESS,
    pass: process.env.SENDER_ADDRESS_PASSWORD,
  },
});

// Test mail options
// const mailOptions: any = {
//   from: {
//     name: "Paxx Finance",
//     address: process.env.SENDER_ADDRESS,
//   },
//   to: ["example@gmail.com"],
//   subject: "Welcome to Paxx Finance",
//   text: "Hello Users",
//   html: "<h1>Welcome to Paxx Finance!</h1>",
//   attachments: [
//     {
//       filename: "sample.pdf",
//       path: path.join(__dirname, "sample.pdf"),
//       contentType: "application/pdf",
//     },
//     {
//       filename: "test.jpg",
//       path: path.join(__dirname, "test.jpg"),
//       contentType: "image/jpg",
//     },
//   ],
// };

// export const testSendMail = async () => {
//   try {
//     await transporter.sendMail(mailOptions);
//     log("Email has been sent successfully!");
//     return { msg: "Email has been sent successfully!" };
//   } catch (error: any) {
//     log(error);
//     return error;
//   }
// };

export const sendMail = async (mailOptions: any) => {
  const mailRes = await transporter.sendMail(mailOptions);
  return mailRes;
};
