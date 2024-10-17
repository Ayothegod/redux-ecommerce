/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AuthState } from "@/services/auth/types";
import {
  useCreateOrderMutation,
  useGetCartQuery,
} from "@/services/products/productSlice";
import { Link, useNavigate } from "react-router-dom";

export function Checkout({ authState }: { authState: AuthState }) {
  const [newOrder] = useCreateOrderMutation();
  const { id }: any = authState.user;
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data } = useGetCartQuery(id as string);
  const items = data?.items;
  const shipping = 0;

  // console.log(JSON.stringify(items, null, 2));

  const totalPrice =
    items &&
    items.reduce((total, item) => {
      return total + item.productPrice * item.quantity;
    }, 0);

  const createOrder = async () => {
    if (!authState) {
      toast({
        variant: "destructive",
        description: "You need to login to perform this action.",
      });
      navigate("/auth/login");
      return;
    }

    const body = { orderItems: items, totalAmount: totalPrice };
    try {
      const response = await newOrder(body).unwrap();
      // console.log(response);
      localStorage.setItem("order", JSON.stringify(response.data));

      toast({
        description: `${response.message}`,
      });

      navigate("/products/order/confirmation");
      return;
    } catch (error: any) {
      console.log({ error });

      if (error.status === 403) {
        toast({
          variant: "destructive",
          description: `${error.data.message}`,
        });
        navigate("/products/order/confirmation");
        return;
      }

      if (error.data) {
        return toast({
          variant: "destructive",
          description: `${error.data.message}`,
        });
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        return null;
      }
    }
  };

  return (
    <div>
      <section className="bg-base">
        <div className="py-10 md:py-20 text-white flex items-center justify-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="text-lg text-white/70 hover:text-white">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <Link
                  to="/products"
                  className="text-lg text-white/70 hover:text-white"
                >
                  Products
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg text-white/50">
                  Checkout
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="my-20 px-4 md:px-10 flex items-center justify-center">
        <aside className=" w-full sm:w-1/2 rounded-md shadow overflow-hidden border">
          <div className="w-full bg-base font-semibold text-white p-3">
            Order Summary
          </div>
          <div className="w-full p-3 flex flex-col gap-2 bg-neutral-100">
            <div
              className="flex item-center
             justify-between"
            >
              <p>Subtotal</p>
              <span>${totalPrice}</span>
            </div>
            <div
              className="flex item-center
             justify-between"
            >
              <p>Shipping</p>
              <span>Free</span>
            </div>
            <Button
              variant="ghost"
              className=" items-start justify-start text-baseAccent"
              disabled
            >
              Add Coupon Code
            </Button>
          </div>
          <div className="flex items-center justify-between p-3">
            <p>Total</p>
            <span>${totalPrice && totalPrice + shipping}</span>
          </div>

          <div className="w-full bg-neutral-100 p-3 flex flex-col gap-4 md:flex-row-reverse">
            <Button
              className="w-full rounded-full"
              variant="basePrimary"
              onClick={createOrder}
            >
              Confirm Order
            </Button>

            <Link to="/products/cart" className="w-full">
              <Button className="w-full rounded-full" variant="base">
                Cancel
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
