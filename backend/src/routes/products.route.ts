import { log } from "console";
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware";
import { prisma } from "../utils/db";
import { productSchema } from "../utils/schema";

type Variables = {
  seller: string;
};

const auth = new Hono<{ Variables: Variables }>();

const productsRoute = auth
  .post("/create-product", async (c) => {
    try {
      const body = await c.req.json();

      const result = await productSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json({ message: errorMessages.join(", ") });
      }

      const sellerDetails: any = c.get("seller");

      const product = await prisma.product.create({
        data: {
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          sellerId: sellerDetails.id,
          category: result.data.category,
          tags: ["car"],
          imageUrl: result.data.imageUrl || "",
        },
      });

      log(product);

      c.status(201);
      return c.json({
        message: "Product registered successfully!",
        statusCode: 201,
        data: {},
      });
    } catch (error: any) {
      log(error);
      c.status(400);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  .get("/test", authMiddleware("SELLER"), (c) => {
    const sellerDetails = c.get("seller");
    log(sellerDetails);
    return c.json({
      message: "hello seller, welcome to your dashboard",
      sellerDetails,
    });
  });

export default productsRoute;
