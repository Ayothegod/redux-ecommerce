import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoute from "./routes/auth.route.js";
import sellerProductsRoute from "./routes/products.route.js";
import productsOrders from "./routes/orders.route.js";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/api/*", cors());
app.use(
  "/api2/*",
  cors({
    origin: "http://example.com",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello User, Welcome to paxx.");
});
app.route("/api/v1/auth", authRoute);
app.route("/api/v1/products", sellerProductsRoute);
app.route("/api/v1/orders", productsOrders);

const port = 6000;
console.log(`Server is running on port ${port}`);

try {
  serve({
    fetch: app.fetch,
    port,
  });
} catch (err) {
  console.log(`Failed to start the server with error: ${err}`);
}
