import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoute from "./routes/auth.route.js";
import sellerProductsRoute from "./routes/products.route.js";
import productsOrders from "./routes/orders.route.js";


const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello User, Welcome to paxx.");
});
app.route("/api/v1/auth", authRoute)
app.route("/api/v1/products", sellerProductsRoute);
app.route("/api/v1/orders", productsOrders);


const port = 6000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
