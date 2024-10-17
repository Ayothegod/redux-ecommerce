/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartTable } from "@/components/base/CartTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { AuthState } from "@/services/auth/types";
import { useGetCartQuery } from "@/services/products/productSlice";

export function Cart({ authState }: { authState: AuthState }) {
  const { id }: any = authState.user;
  const { data } = useGetCartQuery(id as string);
  const items = data?.items;
  const shipping = 0;

  const totalPrice =
    items &&
    items.reduce((total, item) => {
      return total + item.productPrice * item.quantity;
    }, 0);
  console.log("Total Price:", totalPrice);

  return (
    <div className="">
      <section className="bg-base">
        <div className="py-10 md:py-20 text-white flex items-center justify-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-lg text-white/70 hover:text-white"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/products"
                  className="text-lg text-white/70 hover:text-white"
                >
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg text-white/50">
                  Cart
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="py-10 body flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full shadow">
          <div></div>
          {items && <CartTable items={items} />}
        </div>

        <aside className="md:max-w-[35%] w-full rounded-md shadow overflow-hidden">
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

          <div className="w-full bg-neutral-100 p-3">
            <Button className="w-full rounded-full" variant="basePrimary">
              Proceed To Checkout
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
