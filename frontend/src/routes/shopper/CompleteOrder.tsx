/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export function CompleteOrder() {
  const savedOrder: any = localStorage.getItem("order");
  const orderObject = JSON.parse(savedOrder);

  const date = new Date(orderObject.date);
  const formattedDate = format(date, "yyyy-MM-dd");

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
                  Order Completed
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="w-full sm:w-2/3 mx-auto flex flex-col gap-4 py-10 md:py-20 items-center justify-center px-4">
        <div className="flex items-center justify-center p-2 rounded-full w-max bg-baseAccent text-white shadow">
          <Check className="h-16 w-16" />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold my-4">
            Thank you for your purchase
          </h2>
          <p>Your order has been successfully processed</p>
          <p>Here are the details</p>
        </div>

        <aside className=" w-full sm:w-2/2 lg:w-2/3 rounded-md shadow overflow-hidden border">
          <div className="w-full bg-base font-semibold text-white p-3">
            Order Summary
          </div>
          <div className="w-full p-3 flex flex-col gap-2 bg-neutral-100">
            <div
              className="flex item-center
             justify-between"
            >
              <p>Order Number</p>
              <span>#{orderObject.orderId}</span>
            </div>
            <div
              className="flex item-center
             justify-between"
            >
              <p>Date</p>
              <span>{formattedDate}</span>
            </div>
            <div
              className="flex item-center
             justify-between"
            >
              <p>Items Purchased</p>
              <span>{orderObject.items} Total Item(s)</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <p>Total</p>
            <span>${orderObject.amount}</span>
          </div>

          <div className="w-full bg-neutral-100 p-3 flex flex-col gap-4 md:flex-row-reverse">
            <Link to="/products" className="w-full">
              <Button
                className="w-full rounded-full"
                variant="basePrimary"
                // onClick={createOrder}
              >
                Return
              </Button>
            </Link>
          </div>
        </aside>

        <div className="w-full mt-4 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Order Status</h1>
          <p>
            Your order is now complete, and will be processed for shipment. You
            will receive a confirmation email shortly with tracking information
            once your items has been dispatched.
          </p>

          <p>
            Thank you fpor shopping with us! if you have any questions or
            concerns, please don't hesitate to contact our customer support team
            at:
          </p>

          <div className="flex flex-col gap-2 text-baseAccent">
            <a href="/">Email: heyayomideadebisi@gmail.com</a>
            <a href="/">Github: Ayothgod</a>
          </div>
        </div>
      </div>
    </div>
  );
}
