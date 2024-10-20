import { log } from "console";
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { prisma } from "../utils/db.js";
import { productSchema, updateProductSchema } from "../utils/schema.js";
import cloudinary from "../cloudinary.js";

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
  .get("/all", async (c) => {
    try {
      const page = c.req.query("page");
      const limit = c.req.query("limit");

      const pageNumber = page ? parseInt(page, 10) : 1;
      const limitNumber = limit ? parseInt(limit, 10) : 10;
      // console.log(pageNumber, limitNumber);

      const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
          skip: (pageNumber - 1) * limitNumber,
          take: limitNumber,
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.product.count(),
      ]);
      // log(products);

      return c.json(
        {
          message: "All products returned successfully!",
          statusCode: 200,
          data: { products, totalCount },
        },
        200
      );
    } catch (error: any) {
      c.json({ message: error.message, statusCode: 500, data: null }, 500);
    }
  })
  .get("/:sellerId/products", authMiddleware("SELLER"), async (c) => {
    try {
      const sellerId = c.req.param("sellerId");

      const products = await prisma.product.findMany({
        where: {
          sellerId: sellerId,
        },
      });
      // log(products);

      return c.json(
        {
          message: "All products returned successfully!",
          statusCode: 200,
          data: { products },
        },
        200
      );
    } catch (error: any) {
      c.json({ message: error.message, statusCode: 500, data: null }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const id = c.req.param("id");

      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      // log(product);

      return c.json(
        {
          message: "Product returned successfully!",
          statusCode: 200,
          data: { product },
        },
        200
      );
    } catch (error: any) {
      c.json({ message: error.message, statusCode: 500, data: null }, 500);
    }
  })
  .post("/product", authMiddleware("SELLER"), async (c) => {
    try {
      const body = await c.req.json();

      const result = await productSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json({ message: errorMessages.join(", ") });
      }

      const uploadResult: any = await cloudinary.uploader
        .upload(body.image, {
          upload_preset: "unsigned_upload",
          public_id: `${result.data.name}-image`,
          allowed_formats: ["png", "jpg", "svg", "ico", "jfif", "webp"],
        })
        .catch((error) => {
          console.log(error);
          c.json(
            {
              message: "Failed to upload product image",
              statusCode: 404,
              data: null,
            },
            404
          );
        });
      // console.log(uploadResult);

      const sellerDetails: any = c.get("user");

      const product = await prisma.product.create({
        data: {
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          sellerId: sellerDetails.id,
          category: result.data.category,
          imageUrl: uploadResult.public_id,
          tags: {
            create: body.tags.map((tag: string) => ({
              name: tag,
            })),
          },
        },
        include: {
          tags: true,
        },
      });

      return c.json(
        {
          message: "Product registered successfully!",
          statusCode: 201,
          data: { imagePublicId: uploadResult.public_id, name: product.name },
        },
        201
      );
    } catch (error: any) {
      log(error);
      c.json({ message: error.message, statusCode: 500, data: null }, 500);
    }
  })
  .delete("/:id", authMiddleware("SELLER"), async (c) => {
    try {
      const id = c.req.param("id");
      console.log(id);

      const deletedProduct = await prisma.product.delete({ where: { id: id } });
      log(deletedProduct);

      return c.json(
        {
          message: "Product deleted successfully!",
          data: null,
        },
        200
      );
    } catch (error: any) {
      log(error);
      c.json({ message: error.message, data: null }, 500);
    }
  });
// .put("/products/:id", async (c) => {
//   try {
//     const id = c.req.param("id");
//     const body = await c.req.json();

//     const result = await updateProductSchema.safeParse(body);
//     if (result.error) {
//       const errorMessages = result.error.issues.map((issue) => issue.message);
//       return c.json({ message: errorMessages.join(", ") });
//     }

//     const sellerDetails: any = c.get("user");

//     const updatedProduct = await prisma.product.update({
//       where: {
//         id: id,
//       },
//       data: {
//         ...(result.data.name && { name: result.data.name }),
//         ...(result.data.description && {
//           description: result.data.description,
//         }),
//         ...(result.data.price && { price: result.data.price }),
//         ...(result.data.category && { category: result.data.category }),
//         ...(result.data.tags && { tags: result.data.tags }),
//         ...(result.data.imageUrl && { imageUrl: result.data.imageUrl }),
//         sellerId: sellerDetails.id,
//       },
//     });
//     log(updatedProduct);

//     c.status(201);
//     return c.json({
//       message: "Product updated successfully!",
//       statusCode: 201,
//       data: { updatedProduct },
//     });
//   } catch (error: any) {
//     c.status(500);
//     c.json({ message: error.message, statusCode: 500, data: null });
//   }
// })
// .get("/products/category/:categoryName", async (c) => {
//   try {
//     const categoryName = c.req.param("categoryName");

//     // const productByCategory = await prisma.product
//     // log(product);

//     c.status(200);
//     return c.json({
//       message: "Product registered successfully!",
//       statusCode: 200,
//       data: {},
//     });
//   } catch (error: any) {
//     c.status(400);
//     c.json({ message: error.message, statusCode: 500, data: null });
//   }
// });

export default sellerProductsRoute;
