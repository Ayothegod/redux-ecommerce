import { DataTable } from "@/components/seller/ProductsTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OrdersColumns } from "@/lib/tableColumns";
import { useGetAllSellerOrdersQuery } from "@/services/products/productSlice";
// import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { data: products } = useGetAllSellerOrdersQuery();
  const recentFiveProducts = products && products.slice(0, 3);

  // console.log(JSON.stringify(products, null, 2));
  return (
    <main>
      {/* <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
        <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1 flex flex-col gap-2">
          <Label>Total Revenue</Label>
          <div className="flex items-center justify-between ">
            <p>$</p>
            <div className="text-green-600">
              <TrendingUp />
            </div>
          </div>
        </div>
        <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1">
          <Label>Total Order</Label>
          <div className="flex items-center justify-between ">
            <p></p>
            <div className="text-green-600">
              <TrendingUp />
            </div>
          </div>
        </div>
        <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1">
          <Label>Total Products</Label>
          <div className="flex items-center justify-between ">
            <p>$</p>
            <div className="text-green-600">
              <TrendingUp />
            </div>
          </div>
        </div>
        <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1">
          <Label>Total Revenue</Label>
          <div className="flex items-center justify-between ">
            <p>$</p>
            <div className="text-green-600">
              <TrendingUp />
            </div>
          </div>
        </div>
      </div> */}

      <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1 mb-20 mt-8">
        <div className="flex items-center justify-between ">
          <h2 className="font-semibold text-lg mb-2">Recent Orders</h2>
          <Link to="/seller/orders" className="hover:underline">
            <Label>See More</Label>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          {!products && (
            <div className="flex items-center justify-center w-max flex-col gap-4 my-10">
              <p>You don't have any orders yet!</p>
              <Link to="/seller/orders">
                <Button variant="basePrimary" className="rounded-full">
                  Add Orders
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="">
          <DataTable columns={OrdersColumns} data={recentFiveProducts ?? []} />
        </div>
      </div>
    </main>
  );
}
