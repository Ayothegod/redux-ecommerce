import { log } from "console";
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { prisma } from "../utils/db.js";
import { OrderItem } from "../utils/schema.js";

type Variables = {
  user: string;
};

// TODO: put middleware to limit the usage of these endponts
const auth = new Hono<{ Variables: Variables }>();

const productsOrders = auth
  .get("/test", authMiddleware("SELLER"), (c) => {
    const userDetails: any = c.get("user");

    log(userDetails);
    return c.json({
      message: "hello user, welcome to your dashboard",
      userDetails,
    });
  })
  .post("/create", authMiddleware("SHOPPER"), async (c) => {
    try {
      const { orderItems, totalAmount } = await c.req.json();
      const user: any = c.get("user");
      console.log(orderItems, totalAmount);

      if (user.role === "SELLER") {
        return c.json(
          {
            message: "A seller cannot shop for products right now!",
            data: null,
          },
          400
        );
      }

      // // Extract product IDs from the order items
      // const productIds = orderItems.map((item: OrderItem) => item.productId);

      // // Check for existing pending orders with the same products and shopper
      // const existingOrder = await prisma.order.findFirst({
      //   where: {
      //     shopperId: user.id,
      //     status: "PENDING",
      //     orderItems: {
      //       some: {
      //         productId: { in: productIds },
      //       },
      //     },
      //   },
      //   include: { orderItems: true },
      // });

      // if (existingOrder) {
      //   return c.json(
      //     {
      //       message: "You already have a pending order with the same items.",
      //       data: null,
      //     },
      //     403
      //   );
      // }

      const newOrder = await prisma.order.create({
        data: {
          totalAmount,
          shopperId: user.id,
          status: "PENDING",
          orderItems: {
            create: orderItems.map((item: OrderItem) => ({
              productId: item.productId,
              sellerId: item.sellerId,
              quantity: item.quantity,
              price: item.productPrice,
              status: "PENDING",
            })),
          },
        },
        include: { orderItems: true },
      });
      log(newOrder);

      // delete all cartItems

      return c.json(
        {
          message: "Order created successfully!",
          data: {
            orderId: newOrder.id,
            date: newOrder.createdAt,
            items: newOrder.orderItems.length,
            amount: newOrder.totalAmount
          },
        },
        201
      );
    } catch (error: any) {
      console.log("Error", error);

      return c.json(
        {
          message: "Error creating order",
          data: null,
        },
        500
      );
    }
  })
  // ADMIN
  .get("/admin/orders", async (c) => {
    try {
      const allOrders = await prisma.order.findMany({
        include: { orderItems: true },
      });
      log(allOrders);

      c.status(200);
      return c.json({
        message: "All system orders returned successfully!",
        statusCode: 200,
        data: { allOrders },
      });
    } catch (error: any) {
      c.status(400);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  // user/admin
  .get("/orders/:id", async (c) => {
    try {
      const id = c.req.param("id");

      const order = await prisma.order.findUnique({
        where: { id },
        include: { orderItems: true, Shopper: true },
      });

      if (!order) {
        return c.json({ error: "Order not found" }, 404);
      }

      return c.json(
        {
          message: "Single order returned successfully!",
          statusCode: 201,
          data: { order },
        },
        200
      );
    } catch (error: any) {
      c.json({ message: error.message, statusCode: 500, data: null }, 500);
    }
  })
  // ONLY ADMIN CAN UPDATE ORDER STATUS
  .put("/orders/:id/status", async (c) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status: body.status },
      });
      log(updatedOrder);

      return c.json(
        {
          message: "Product updated successfully!",
          statusCode: 201,
          data: { updatedOrder },
        },
        201
      );
    } catch (error: any) {
      c.status(500);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  // ADMIN OR USER CAN DELETE ORDER
  .delete("/order/:id", async (c) => {
    try {
      const id = c.req.param("id");

      const deletedOrder = await prisma.order.delete({ where: { id: id } });
      log(deletedOrder);

      return c.json(
        {
          message: "Order deleted successfully!",
          statusCode: 200,
          data: { deletedOrder },
        },
        200
      );
    } catch (error: any) {
      log(error);
      c.json({ message: error.message, statusCode: 500, data: null }, 500);
    }
  })
  // LET SELLER SEE THEIR ITEMS THAT ARE PART OF ORDERS
  .get("/seller/orders", async (c) => {
    try {
      const userDetails: any = c.get("user");

      const sellerOrders = await prisma.orderItem.findMany({
        where: { sellerId: userDetails.id },
        include: { product: true, order: true },
      });
      log(sellerOrders);

      c.status(200);
      return c.json({
        message: "All seller ordered items returned successfully!",
        statusCode: 200,
        data: { sellerOrders },
      });
    } catch (error: any) {
      c.status(400);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  // LET SELLER UPDATE STATUS OF THEIR ITEM IN AN ORDER (ORDERITEM)
  .put("/orders/:orderId/items/:itemId/status", async (c) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      c.status(201);
      return c.json({
        message: "Product updated successfully!",
        statusCode: 201,
        data: {},
      });
    } catch (error: any) {
      c.status(500);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  })
  // LET SHOPPERS VIEW THEIR ORDERS
  .get("/user/orders", async (c) => {
    try {
      const userDetails: any = c.get("user");

      const userOrders = await prisma.order.findMany({
        where: { shopperId: userDetails.id },
        include: { orderItems: true },
      });
      log(userOrders);

      c.status(200);
      return c.json({
        message: "All user orders returned successfully!",
        statusCode: 200,
        data: { userOrders },
      });
    } catch (error: any) {
      c.status(400);
      c.json({ message: error.message, statusCode: 500, data: null });
    }
  });
// .post("/products", async (c) => {
//   try {
//     const body = await c.req.json();

//     const result = await productSchema.safeParse(body);
//     if (result.error) {
//       const errorMessages = result.error.issues.map((issue) => issue.message);
//       return c.json({ message: errorMessages.join(", ") });
//     }

//     const sellerDetails: any = c.get("seller");

//     const product = await prisma.product.create({
//       data: {
//         name: result.data.name,
//         description: result.data.description,
//         price: result.data.price,
//         sellerId: sellerDetails.id,
//         category: result.data.category,
//         tags: ["car"],
//         imageUrl: result.data.imageUrl || "",
//       },
//     });

//     log(product);

//     c.status(201);
//     return c.json({
//       message: "Product registered successfully!",
//       statusCode: 201,
//       data: {},
//     });
//   } catch (error: any) {
//     log(error);
//     c.status(400);
//     c.json({ message: error.message, statusCode: 500, data: null });
//   }
// })
// .put("/products/:id", async (c) => {
//   try {
//     const id = c.req.param("id");
//     const body = await c.req.json();

//     const result = await updateProductSchema.safeParse(body);
//     if (result.error) {
//       const errorMessages = result.error.issues.map((issue) => issue.message);
//       return c.json({ message: errorMessages.join(", ") });
//     }

//     const sellerDetails: any = c.get("seller");

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
// .delete("/products/:id", async (c) => {
//   try {
//     const id = c.req.param("id");

//     const deletedProduct = await prisma.product.delete({ where: { id: id } });
//     log(deletedProduct);

//     c.status(200);
//     return c.json({
//       message: "Product deleted successfully!",
//       statusCode: 201,
//       data: { deletedProduct },
//     });
//   } catch (error: any) {
//     log(error);
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

export default productsOrders;
