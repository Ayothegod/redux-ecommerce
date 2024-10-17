import { Footer } from "@/components/base/Footer";
import { Header } from "@/components/base/Header";
import { Info } from "@/components/base/Info";
import { HandleImage } from "@/components/seller/HandleImage";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGetProductByIdQuery } from "@/services/products/productSlice";
import { Heart, Minus, MoveLeft, Pin, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export function SingleProduct() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const id: string | undefined = useLoaderData() as string | undefined;
  const { data: product } = useGetProductByIdQuery(id as string);
  // console.log(isLoading);
  const [amount, setAmount] = useState(1);

  const addToCart = () => {
    toast({
      title: "Yay! Item added to cart",
    });
    navigate("/products/cart");
    return;
  };

  return (
    <div className="">
      <section className="bg-base">
        <Header />
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
                  {product?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="py-10 body gap-4">
        <Link to="/products" className="w-max">
          <p className="flex items-center gap-2 text-baseAccent cursor-pointer hover:underline w-max">
            <MoveLeft /> Back to products
          </p>
        </Link>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2  h-full w-full gap-8">
          <div className="w-full h-96 rounded-md overflow-hidden">
            {product && (
              <HandleImage
                uploadedImage={product.imageUrl}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="w-full flex flex-col items-start gap-4">
            <aside className="p-2 rounded-md bg-neutral-100 flex items-center justify-between w-full">
              <div className="text-sm font-semibold flex items-center gap-2">
                <Pin /> Save 10% on your first order over $1000
              </div>
            </aside>

            <div className="mt-4">
              <h2 className="font-semibold text-xl">{product?.name}</h2>
              <p>{product?.description}</p>
            </div>

            <div className="my-4">
              <p className="font-bold">${product?.price}.00</p>
              <div>
                <div></div>
              </div>
            </div>

            <div className="p-1 rounded-full bg-neutral-100 flex items-center mt-auto">
              <button
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center"
                onClick={() => (amount === 1 ? null : setAmount(amount - 1))}
              >
                <Minus />
              </button>
              <p className="py-2 w-20 flex items-center justify-center">
                {amount}
              </p>
              <button
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer"
                onClick={() => setAmount(amount + 1)}
              >
                <Plus />
              </button>
            </div>

            <div className="w-full flex gap-4 flex-col items-center sm:flex-row">
              <Button
                size="lg"
                variant="basePrimary"
                className="rounded-full flex items-center gap-2 px-8 w-full"
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="base"
                className="rounded-full flex items-center gap-2 px-8 w-full"
                onClick={addToCart}
              >
                Add To Cart
              </Button>
              <div className="border p-3 rounded-full hover:bg-neutral-100">
                <Heart className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Info />
      <Footer />
    </div>
  );
}
