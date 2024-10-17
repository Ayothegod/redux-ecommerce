/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { AuthState } from "@/services/auth/types";
import { useGetCartQuery } from "@/services/products/productSlice";
import { Link } from "react-router-dom";

export function Checkout({ authState }: { authState: AuthState }) {
  const { id }: any = authState.user;
  const { data } = useGetCartQuery(id as string);
  const items = data?.items;
  const shipping = 0;

  const totalPrice =
    items &&
    items.reduce((total, item) => {
      return total + item.productPrice * item.quantity;
    }, 0);

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
                  to="/products "
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
            <Button className="w-full rounded-full" variant="basePrimary">
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
