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
import { authMiddleware } from "../middlewares/authMiddleware.js";

const auth = new Hono();

const authRoute = auth
  .post("/register", async (c) => {
    try {
      const body = await c.req.json();
      log(body);

      const result = await registrationSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json({ message: errorMessages.join(", ") }, 400);
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
      log(body);

      const result = await loginSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json(
          { statusCode: 400, message: errorMessages.join(", ") },
          400
        );
      }

      // check if user exist
      const user = await prisma.user.findUnique({
        where: { email: result.data.email },
      });
      if (!user) {
        return c.json(
          {
            message: "User not found, please signup instead.",
            statusCode: 400,
            data: null,
          },
          400
        );
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

      const userRes = {
        id: user.id,
        email: user.email,
        accountType: user.accountType,
      };

      return c.json(
        {
          message: "Login successful!",
          statusCode: 200,
          data: { accessToken, refreshToken, userRes },
        },
        200
      );
    } catch (error: any) {
      log(error);
      c.json({ message: error.message, statusCode: 500, data: null }, 500);
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
  })
  .get("/admin/getUsers", authMiddleware("ADMIN"), async (c) => {
    try {
      const users = await prisma.user.findMany({});
      return c.json(
        {
          message: "Users returned successfully!",
          data: { users: users },
        },
        201
      );
    } catch (error: any) {
      log(error);
      c.json({ message: "Error: unable to fetch users", data: null }, 500);
    }
  })
  .post("/admin/createUser", authMiddleware("ADMIN"), async (c) => {
    try {
      const body = await c.req.json();

      const result = await registrationSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json({ message: errorMessages.join(", ") }, 400);
      }

      const userExists = await prisma.user.findUnique({
        where: { email: result.data.email },
      });
      if (userExists) {
        return c.json(
          {
            message: "User already exists!",
            data: null,
          },
          400
        );
      }

      const hashedPassword = await hashPassword(result.data?.password);

      const user = await prisma.user.create({
        data: {
          email: result.data.email,
          password: hashedPassword,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          accountType: result.data.accountType,
        },
      });

      return c.json(
        {
          message: "User registered successfully!",
          data: null,
        },
        201
      );
    } catch (error: any) {
      log(error);
      c.json({ message: error.message, data: null }, 500);
    }
  })
  .get("/admin/deleteUser/:id", authMiddleware("ADMIN"), async (c) => {
    try {
      const id = c.req.param("id");
      const deletedUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      if (!deletedUser) {
        c.json({ message: "User not found!", data: null }, 400);
        return;
      }

      return c.json(
        {
          message: "Login successful!",
          data: null,
        },
        200
      );
    } catch (error: any) {
      return c.json({ message: "Error deleting user", data: null }, 500);
    }
  });

export default authRoute;
