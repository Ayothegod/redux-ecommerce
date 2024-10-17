import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { itemProduct } from "@/services/products/types";
import { Minus, Plus, XCircle } from "lucide-react";

export function CartTable({ items }: { items: itemProduct[] }) {
  // const totalPrice = items.reduce((total, item) => {
  //   return total + item.productPrice * item.quantity;
  // }, 0);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="">Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <div>{item.productName}</div>
            </TableCell>
            <TableCell>${item.productPrice}</TableCell>
            <TableCell>
              <div className="p-1 rounded-full bg-neutral-100 flex items-center w-max">
                <button
                  className="h-10 w-10 rounded-full bg-white flex items-center justify-center"
                  // onClick={() => (amount === 1 ? null : setAmount(amount - 1))}
                >
                  <Minus />
                </button>
                <p className="py-2 w-10 flex items-center justify-center">
                  {item.quantity}
                </p>
                <button
                  className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer"
                  // onClick={() => setAmount(amount + 1)}
                >
                  <Plus />
                </button>
              </div>
            </TableCell>
            <TableCell className="">
              ${item.productPrice * item.quantity}
            </TableCell>
            <TableCell className="">
              <XCircle className="cursor-pointer" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
