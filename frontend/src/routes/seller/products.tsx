/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { AuthState } from "@/services/auth/types";
import { useGetAllSellerProductsQuery } from "@/services/products/productSlice";
import { productModel } from "@/services/products/types";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function SellerProducts({ authState }: { authState: AuthState }) {
  const { data: products, isLoading } = useGetAllSellerProductsQuery(
    authState.user?.id as any
  );
  console.log(products);
  // console.log(JSON.stringify(products, null, 2));  


  return (
    <div className="flex flex-col gap-4">
      <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1">
        <Link to="/seller/products/new">
          <Button className="flex items-center gap-2 ml-auto">
            <PlusCircle />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1">
        <h2 className="font-semibold text-lg">Products</h2>
        {/* <div>
          {!products && (
            <div className="flex items-center justify-center flex-col gap-4 my-10">
              <p>You don't have any products yet!</p>
              <Link to="/seller/products/new">
                <Button>Add Products</Button>
              </Link>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
