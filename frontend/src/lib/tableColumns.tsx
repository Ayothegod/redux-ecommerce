/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { HandleImage } from "@/components/seller/HandleImage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useDeleteProductMutation } from "@/services/products/productSlice";
import { productModel, SellerOrderData } from "@/services/products/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const productsColumns: ColumnDef<productModel>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      return (
        <div className="">
          <HandleImage uploadedImage={imageUrl} className="w-10 h-10" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const originalDate = row.original.createdAt;
      const date = new Date(originalDate);
      const formattedDate = format(date, "yyyy-MM-dd HH:mm");
      return <div className="text-right">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Image",
    cell: ({ row }) => {
      const name = row.original.name;
      const id = row.original.id;

      const [useDeleteProduct] = useDeleteProductMutation();
      const { toast } = useToast();

      const payment = row.original;
      const [deleteProduct, setDeleteProduct] = useState(false);
      const deleteProductConfirm = () => {
        setDeleteProduct(true);
      };

      const deleteData = async () => {
        try {
          const response = await useDeleteProduct(id as string).unwrap();
          // console.log({response});

          toast({
            description: `Product deleted successfully`,
          });
          setDeleteProduct(false);
          return;
        } catch (error: any) {
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
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy Product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={deleteProductConfirm}>
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {deleteProduct && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,.2)] flex items-center justify-center h-screen z-50 px-4 sm:px-0">
              <div className="bg-white p-8 rounded-md shadow w-full sm:w-1/2 md:w-1/3 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Delete Product</h2>
                    <Label>
                      Once confirmed, the following product will be deleted.
                    </Label>
                  </div>
                  <X
                    onClick={() => setDeleteProduct(false)}
                    className="cursor-pointer"
                  />
                </div>

                <p className="text-base font-medium">{name}</p>

                <div className="w-full flex flex-col gap-2">
                  <Button
                    onClick={() => setDeleteProduct(false)}
                    variant="outline"
                    className="rounded-full w-full"
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="basePrimary"
                    className="rounded-full w-full"
                    onClick={deleteData}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
];

export const OrdersColumns: ColumnDef<SellerOrderData>[] = [
  {
    accessorKey: "id",
    header: "Order No",
    cell: ({ row }) => {
      const id: any = row.getValue("id");
      const orderNo = id.slice(10, 20);

      return (
        <Link to={`/seller/orders/${id}`}>
          <div className="">#{orderNo}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: "order.createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const originalDate = row.original.order.createdAt;
      const date = new Date(originalDate);
      const formattedDate = format(date, "yyyy-MM-dd");
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "product.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const quantity = row.original.quantity;
      const totalAmount = price * quantity;

      return <div className="text-right font-medium">${totalAmount}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "DELIVERED") {
        return (
          <div className="text-right font-medium p-1 rounded bg-green-500 text-white">
            DELIVERED
          </div>
        );
      }

      if (status === "CANCELLED") {
        return (
          <div className="text-right font-medium p-1 rounded bg-red-500 text-white">
            DELIVERED
          </div>
        );
      }
      if (status === "SHIPPED") {
        return (
          <div className="text-right font-medium p-1 rounded bg-blue-500 text-white">
            DELIVERED
          </div>
        );
      }

      return (
        <div className="text-center font-medium p-1 rounded bg-yellow-500 text-white">
          PENDING
        </div>
      );
    },
  },
];
