/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useRemoveFromCartMutation } from "@/services/products/productSlice";
import { itemProduct } from "@/services/products/types";
import { Minus, Plus, XCircle } from "lucide-react";

export function CartTable({ items }: { items: itemProduct[] }) {
  const { toast } = useToast();
  const [removeItemFromCart] = useRemoveFromCartMutation();

  const removeCart = async (productId: string) => {
    const body = { productId: productId };
    try {
      const response = await removeItemFromCart(body).unwrap();
      console.log(response);

      toast({
        title: "Item removed from cart",
      });
      return;
    } catch (error: any) {
      console.log({ error });
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
        {!items.length ? (
          <div className="flex items-center justify-center w-full py-10">No item in cart</div>
        ) : (
          items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div>{item.productName}</div>
              </TableCell>
              <TableCell>${item.productPrice}</TableCell>
              <TableCell>
                <div className="p-1 rounded-full bg-neutral-100 flex items-center w-max">
                  <button className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    <Minus />
                  </button>
                  <p className="py-2 w-10 flex items-center justify-center">
                    {item.quantity}
                  </p>
                  <button className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
                    <Plus />
                  </button>
                </div>
              </TableCell>
              <TableCell className="">
                ${item.productPrice * item.quantity}
              </TableCell>
              <TableCell className="">
                <XCircle
                  className="cursor-pointer"
                  onClick={() => removeCart(item.productId)}
                />
              </TableCell>
            </TableRow>
          ))
        )}
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
