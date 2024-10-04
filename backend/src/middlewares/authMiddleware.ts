import { Context, Next } from "hono";
import { verifyAccessToken } from "../utils/services.js";

export const authMiddleware =
  (requiredRole: string) => (c: Context, next: Next) => {
    const role = "seller";

    const token = c.req.header("authorization")?.split(" ")[1];

    if (!token) {
      c.status(401);
      return c.json({ message: "No token provided" });
    }

    const decoded: any = verifyAccessToken(token);
    if (!decoded) {
      c.status(401);
      return c.json({ message: "Invalid token" });
    }

    if (requiredRole && decoded?.role !== requiredRole) {
      c.status(403);
      return c.json({ message: "Access forbidden: insufficient permissions" });
    }

    c.set("seller", decoded);
    return next();
  };
