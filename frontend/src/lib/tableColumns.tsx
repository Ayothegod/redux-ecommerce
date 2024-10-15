/* eslint-disable react-hooks/rules-of-hooks */
import { productModel } from "@/services/products/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HandleImage } from "@/components/seller/HandleImage";
import { useState } from "react";

export const products: productModel[] = [
  {
    id: "728ed52f",
    name: "New Top",
    price: 100,
    category: "Table",
    createdAt: new Date(21062004),
    updatedAt: new Date(),
    imageUrl: "",
    description: "",
    sellerId: "",
    tags: [],
  },
  {
    id: "489e1d42",
    name: "processing",
    price: 125,
    category: "Table",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "",
    description: "",
    sellerId: "",
    tags: [],
  },
];

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
      const payment = row.original;
      const [deleteProduct, setDeleteProduct] = useState(false);
      console.log(setDeleteProduct);
      const deleteProductConfirm = () => {};

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
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={deleteProductConfirm}>
                Delete Product
              </DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {deleteProduct && (
            <div className="fixed inset-0">
              <div>Delete products</div>
            </div>
          )}
        </>
      );
    },
  },
];
