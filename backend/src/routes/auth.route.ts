import { log } from "console";
import { Hono } from "hono";
import { prisma } from "../utils/db.js";
import { loginSchema, registrationSchema } from "../utils/schema.js";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../utils/services.js";

const auth = new Hono();

const authRoute = auth
  .post("/register", async (c) => {
    try {
      const body = await c.req.json();
      log(body);

      const result = await registrationSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json({ message: errorMessages.join(", ") });
      }

      // check if user exist
      const userExists = await prisma.user.findUnique({
        where: { email: result.data.email },
      });
      if (userExists) {
        return c.json(
          {
            message: "User already exists, please login instead!",
            statusCode: 400,
            data: null,
          },
          400
        );
      }

      const hashedPassword = await hashPassword(result.data?.password);

      // Create a new user
      const user = await prisma.user.create({
        data: {
          email: result.data.email,
          password: hashedPassword,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          accountType: result.data.accountType,
        },
      });
      log(user);

      const userRes = {
        id: user.id,
        email: user.email,
        role: user.accountType,
      };

      // Generate a token (JWT)
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      console.log(accessToken, refreshToken);

      return c.json(
        {
          message: "User registered successfully!",
          statusCode: 201,
          data: { accessToken, refreshToken, userRes },
        },
        201
      );
    } catch (error: any) {
      log(error);
      c.status(400);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  .post("login", async (c) => {
    try {
      const body = await c.req.json();

      const result = await loginSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        c.status(400);
        return c.json({ statusCode: 400, message: errorMessages.join(", ") });
      }

      // check if user exist
      const user = await prisma.user.findUnique({
        where: { email: result.data.email },
      });
      if (!user) {
        c.status(400);
        return c.json({
          message: "User not found, please signup instead.",
          statusCode: 400,
          data: null,
        });
      }

      // Check password
      const passwordCheck = await comparePassword(
        result.data?.password,
        user.password
      );
      if (!passwordCheck) {
        c.status(400);
        return c.json({
          message: "Invalid credentials!",
          statusCode: 400,
          data: null,
        });
      }

      // Generate a token (JWT)
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      console.log(accessToken, refreshToken);

      c.status(200);
      return c.json({
        message: "Login successful!",
        statusCode: 200,
        data: { accessToken, refreshToken },
      });
    } catch (error: any) {
      log(error);
      c.status(500);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  .delete("logout", async (c) => {
    try {
      c.status(200);
      return c.json({
        message: "Login successful!",
        statusCode: 200,
        // data: { accessToken, refreshToken },
      });
    } catch (error: any) {
      c.status(500);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  });
// .post("refresh-token", async (c) => {
//   const body = await c.req.json();

//   if (!body.refreshToken) {
//     c.status(401);
//     return c.json({
//       status: "FAILED",
//       message: "Refresh token required",
//     });
//   }

//   const decoded: any = verifyRefreshToken(body.refreshToken);
//   if (!decoded) {
//     c.status(403);
//     return c.json({
//       status: "FAILED",
//       message: "Invalid refresh token",
//     });
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       id: decoded.id,
//     },
//   });
//   if (!user) {
//     c.status(403);
//     return c.json({
//       status: "FAILED",
//       message: "User not found",
//     });
//   }

//   const newAccessToken = generateAccessToken(user);
//   c.status(200);
//   return c.json({ status: "SUCCESS", accessToken: newAccessToken });
// })
// .post("forget-password", async (c) => {
//   try {
//     const body = await c.req.json();

//     // Validate email
//     const result = await forgotPasswordSchema.safeParse(body);
//     if (result.error) {
//       const errorMessages = result.error.issues.map((issue) => issue.message);
//       c.status(400);
//       return c.json({ status: "FAILED", message: errorMessages.join(", ") });
//     }

//     // Find the user by email
//     const user = await prisma.user.findUnique({
//       where: { email: result.data.email },
//     });
//     if (!user) {
//       c.status(400);
//       return c.json({
//         status: "FAILED",
//         message: "User not found, please signup instead.",
//       });
//     }

//     // // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

//     const saveOtp = await prisma.otp.create({
//       data: {
//         otp: otp,
//         userId: user.id,
//         expiresAt: expirationTime,
//       },
//     });

//     // // Send OTP via email (implement email sending logic) -> expires in 15mins
//     const otpMailOptions = {
//       from: {
//         name: "Paxx Finance",
//         address: process.env.SENDER_ADDRESS,
//       },
//       to: [`${user.email}`],
//       subject: "Reset Your Password – OTP Inside",
//       html: `<div><p>Hi ${user.name},</p><p>
//       It seems like you’ve requested to reset your password for your Paxx account. No worries, we’ve got you covered!Use the One-Time Password (OTP) below to verify your identity and reset your password: </p><p>Your OTP: ${saveOtp.otp}</p><p>This code will expire in 15 minutes.<p><p>If you didn’t request this, you can safely ignore this email, and your account will remain secure.</p><p>Best regards,<br>  The <strong>Paxx</strong> Team</p></div>`,
//     };

//     const mailRes = await sendMail(otpMailOptions);

//     if (!mailRes) {
//       c.status(400);
//       return c.json({ message: "Error! failed to deliever Otp mail." });
//     }

//     c.status(200);
//     return c.json({ umessage: "OTP sent successfully" });
//   } catch (error: any) {
//     c.status(500);
//     return c.json({ message: error.message });
//   }
// })
// .get("update-password", async (c) => {
//   try {
//     const body = await c.req.json();

//     // Validate inputx
//     const result = await resetPasswordSchema.safeParse(body);
//     if (result.error) {
//       const errorMessages = result.error.issues.map((issue) => issue.message);
//       c.status(400);
//       return c.json({ status: "FAILED", message: errorMessages.join(", ") });
//     }

//     const otpEntry = await prisma.otp.findFirst({
//       where: {
//         otp: result.data.otp,
//         expiresAt: {
//           gt: new Date(),
//         },
//       },
//       include: {
//         user: true,
//       },
//     });

//     if (!otpEntry) {
//       c.status(400);
//       return c.json({ status: "FAILED", message: "Invalid or expired OTP" });
//     }

//     // Extract the user from the OTP entry
//     const user = otpEntry.user;

//     // Hash the new password
//     const hashedPassword = await hashPassword(result.data.newPassword);

//     // Update the user's password
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         password: hashedPassword,
//       },
//     });

//     // Delete only the used OTP
//     await prisma.otp.delete({
//       where: { id: otpEntry.id },
//     });

//     c.status(200);
//     return c.json({
//       status: "SUCCESS",
//       message: "Password reset successfully",
//     });
//   } catch (error: any) {
//     c.status(500);
//     return c.json({ status: "FAILED", message: error.message });
//   }
// });

export default authRoute;
