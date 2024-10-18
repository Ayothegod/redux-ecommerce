import { DataTable } from "@/components/seller/ProductsTable";
import { Button } from "@/components/ui/button";
import { OrdersColumns } from "@/lib/tableColumns";
import { useGetAllSellerOrdersQuery } from "@/services/products/productSlice";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function SellerOrders() {
  const { data: products } = useGetAllSellerOrdersQuery();
  // console.log(JSON.stringify(products, null, 2));

  return (
    <div className="flex flex-col gap-4 max-w-seller">
      <div className="border border-white bg-white shadow-sm w-full px-3 py-2 rounded-md flex-1">
        <Link to="/seller/products/new">
          <Button
            variant="basePrimary"
            className="flex items-center gap-2 ml-auto rounded-full"
            disabled
          >
            <PlusCircle />
            Add Order
          </Button>
        </Link>
      </div>

      <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1 mb-20">
        <h2 className="font-semibold text-lg">Orders</h2>
        <div className="flex items-center justify-center">
          {!products && (
            <div className="flex items-center justify-center w-max flex-col gap-4 my-10">
              <p>You don't have any orders yet!</p>
              <Link to="/seller/products/new">
                <Button variant="basePrimary" className="rounded-full">
                  Add Products
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="">
          <DataTable columns={OrdersColumns} data={products ?? []} />
        </div>
      </div>
    </div>
  );
}
