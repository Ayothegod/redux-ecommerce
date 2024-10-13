import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoute from "./routes/auth.route.js";
import sellerProductsRoute from "./routes/products.route.js";
import productsOrders from "./routes/orders.route.js";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.options("*", (c) => {
  return c.text("", 204);
});

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.get("/", (c) => {
  return c.json("Hello User, Welcome to paxx.");
});
app.get("/api/v1/seller", (c) => {
  return c.json("This is seller 02");
});
app.route("/api/v1/auth", authRoute);
app.route("/api/v1/products", sellerProductsRoute);
app.route("/api/v1/orders", productsOrders);

const port = 3000;
console.log(`Server is running on port ${port}`);

try {
  serve({
    fetch: app.fetch,
    port,
  });
} catch (err) {
  console.log(`Failed to start the server with error: ${err}`);
}
