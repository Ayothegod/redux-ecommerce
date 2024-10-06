import { log } from "console";
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { prisma } from "../utils/db.js";
import { productSchema, updateProductSchema } from "../utils/schema.js";

type Variables = {
  user: string;
};

const auth = new Hono<{ Variables: Variables }>();

const sellerProductsRoute = auth
  .get("/test", authMiddleware("SELLER"), (c) => {
    const userDetails: any = c.get("user");
    log(userDetails);
    return c.json({
      message: `hello User-${userDetails.role}, welcome to your dashboard`,
      userDetails,
    });
  })
  .get("/products", async (c) => {
    try {
      const products = await prisma.product.findMany({});
      log(products);

      c.status(200);
      return c.json({
        message: "All products returned successfully!",
        statusCode: 200,
        data: { products },
      });
    } catch (error: any) {
      c.status(500);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  .get("/products/:id", async (c) => {
    try {
      const id = c.req.param("id");

      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      log(product);

      c.status(200);
      return c.json({
        message: "Product returned successfully!",
        statusCode: 201,
        data: { product },
      });
    } catch (error: any) {
      c.status(400);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  .post("/products", async (c) => {
    try {
      const body = await c.req.json();

      const result = await productSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json({ message: errorMessages.join(", ") });
      }

      const sellerDetails: any = c.get("user");

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
  .put("/products/:id", async (c) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      const result = await updateProductSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json({ message: errorMessages.join(", ") });
      }

      const sellerDetails: any = c.get("user");

      const updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          ...(result.data.name && { name: result.data.name }),
          ...(result.data.description && {
            description: result.data.description,
          }),
          ...(result.data.price && { price: result.data.price }),
          ...(result.data.category && { category: result.data.category }),
          ...(result.data.tags && { tags: result.data.tags }),
          ...(result.data.imageUrl && { imageUrl: result.data.imageUrl }),
          sellerId: sellerDetails.id,
        },
      });
      log(updatedProduct);

      c.status(201);
      return c.json({
        message: "Product updated successfully!",
        statusCode: 201,
        data: { updatedProduct },
      });
    } catch (error: any) {
      c.status(500);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  .delete("/products/:id", async (c) => {
    try {
      const id = c.req.param("id");

      const deletedProduct = await prisma.product.delete({ where: { id: id } });
      log(deletedProduct);

      c.status(200);
      return c.json({
        message: "Product deleted successfully!",
        statusCode: 201,
        data: { deletedProduct },
      });
    } catch (error: any) {
      log(error);
      c.status(500);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  .get("/products/category/:categoryName", async (c) => {
    try {
      const categoryName = c.req.param("categoryName");

      // const productByCategory = await prisma.product
      // log(product);

      c.status(200);
      return c.json({
        message: "Product registered successfully!",
        statusCode: 200,
        data: {},
      });
    } catch (error: any) {
      c.status(400);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  });

export default sellerProductsRoute;
