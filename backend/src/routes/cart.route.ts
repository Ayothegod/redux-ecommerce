import { log } from "console";
import { Hono } from "hono";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { prisma } from "../utils/db.js";
import { cartItemSchema } from "../utils/schema.js";

type Variables = {
  user: string;
};

const auth = new Hono<{ Variables: Variables }>();

const cartRoute = auth
  .get("/:userId", authMiddleware("SHOPPER"), async (c) => {
    try {
      const user: any = c.get("user");
      const userId = c.req.param("userId");

      if (user.id !== userId) {
        return c.json(
          { message: "You are not authorized to view this cart", data: null },
          404
        );
      }

      const cart = await prisma.cart.findUnique({
        where: {
          userId: userId,
        },
        include: {
          items: true,
        },
      });

      if (!cart) {
        return c.json({ message: "Cart is empty", data: null }, 200);
      }

      return c.json(
        {
          message: "All user cart returned successfully!",
          data: { cart },
        },
        200
      );
    } catch (error: any) {
      c.json({ message: error.message, data: null }, 500);
    }
  })
  .post("/add", authMiddleware("SHOPPER"), async (c) => {
    try {
      const body = await c.req.json();
      const user: any = c.get("user");
      const { id } = user;
      // log(body, user)

      const result = await cartItemSchema.safeParse(body);
      if (result.error) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        return c.json({ message: errorMessages.join(", ") });
      }

      const { productId, quantity } = result.data;

      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        return;
      }

      let cart = await prisma.cart.findUnique({
        where: {
          userId: id,
        },
        include: {
          items: true,
        },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId: id,
            items: {
              create: {
                productId,
                quantity,
                productName: product.name,
                productPrice: product.price,
                productUrl: product.imageUrl,
              },
            },
          },
          include: {
            items: true,
          },
        });
      } else {
        const cartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId,
          },
        });

        if (cartItem) {
          await prisma.cartItem.update({
            where: { id: cartItem.id },
            data: {
              quantity: cartItem.quantity + quantity,
            },
          });
        } else {
          await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId,
              quantity,
              productName: product.name,
              productPrice: product.price,
              productUrl: product.imageUrl,
            },
          });
        }
      }

      const updatedCart = await prisma.cart.findUnique({
        where: { userId: id },
        include: { items: true },
      });

      return c.json(
        {
          message: "Item added to cart successfully",
          data: {},
        },
        200
      );
    } catch (error: any) {
      log(error);
      c.json(
        {
          message: "An error occurred while adding the item to the cart.",
          data: null,
        },
        500
      );
    }
  })
  .post("/remove", authMiddleware("SHOPPER"), async (c) => {
    try {
      const body = await c.req.json();
      const user: any = c.get("user");
      const { id } = user;
      const { productId } = body;

      const cart = await prisma.cart.findUnique({
        where: { userId: id },
        include: { items: true },
      });

      if (!cart) {
        return c.json({ message: "Cart not found", data: null }, 404);
      }

      const deletedItem = await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId,
        },
      });
      if (deletedItem.count === 0) {
        c.json(
          {
            message: "No matching cart item found for deletion.",
            data: null,
          },
          400
        );
      }
      // log(deletedItem);

      return c.json({ message: "Item removed from cart", data: null }, 200);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return c.json(
        {
          message: "An error occurred while removing the item from the cart",
          data: null,
        },
        500
      );
    }
  })
  .post("/update", async (c) => {
    try {
      const body = await c.req.json();
      const user: any = c.get("user");
      const { userId } = user;
      const { productId, quantity } = body;

      if (Number(quantity) < 1) {
        return c.json(
          { message: "Quantity must be at least 1", data: null },
          400
        );
      }

      // Find the cart and update the quantity
      const cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        return c.json({ message: "Cart not found", data: null }, 404);
      }

      const cartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      if (!cartItem) {
        return c.json({ message: "Item not found in cart", data: null }, 404);
      }

      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity },
      });

      return c.json(
        { message: "Cart item updated successfully", data: null },
        200
      );
    } catch (error) {
      console.error("Error updating item in cart:", error);
      return c.json(
        {
          message: "An error occurred while updating the cart item",
          data: null,
        },
        500
      );
    }
  })
  .post("/clear", async (c) => {
    try {
      const user: any = c.get("user");
      const { userId } = user;

      const cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        return c.json({ message: "Cart not found", data: null }, 404);
      }

      // Remove all items in the cart
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return c.json({ message: "Cart cleared" }, 200);
    } catch (error) {
      console.error("Error clearing cart:", error);
      return c.json(
        { error: "An error occurred while clearing the cart" },
        500
      );
    }
  })
  .post("/reduce", async (c) => {
    try {
      const body = await c.req.json();
      const user: any = c.get("user");
      const { id } = user;
      const { productId } = body;

      // Find the cart
      const cart = await prisma.cart.findUnique({
        where: { userId: id },
      });

      if (!cart) {
        return c.json({ message: "Cart not found", data: null }, 404);
      }

      const cartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      if (!cartItem) {
        return c.json({ message: "Item not found in cart", data: null }, 404);
      }

      // Decrease quantity
      const newQuantity = cartItem.quantity - 1;

      if (newQuantity <= 0) {
        await prisma.cartItem.delete({
          where: { id: cartItem.id },
        });
        return c.json(
          { message: "Cart item removed successfully", data: null },
          200
        );
      } else {
        await prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: newQuantity },
        });
        return c.json(
          { message: "Cart item updated successfully", data: null },
          200
        );
      }
    } catch (error) {
      console.error("Error reducing item in cart:", error);
      return c.json(
        {
          message: "An error occurred while reducing the cart item",
          data: null,
        },
        500
      );
    }
  });

export default cartRoute;
