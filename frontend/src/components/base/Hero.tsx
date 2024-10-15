import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import bigSofa from "@/assets/images/big-sofa.jpg";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="body flex items-center justify-center md:h-base py-20 md:py-8 px-4">
      <main className="grid grid-cols-1 md:grid-cols-2 h-full w-full gap-8 text-white">
        <div className="flex flex-col items-start justify-center gap-4">
          <aside className="bg-white/20 w-max text-sm px-2 py-1 rounded-full">
            ALL TIME CLASSIC
          </aside>
          <h1 className="font-bold text-4xl md:text-5xl">
            Transform Your Space with Timeless Furniture
          </h1>
          <p>
            Discover beautifully crafted, modern furniture that complements your
            style and lasts for years. From sofas to dining tables, we offer
            elegant pieces designed to elevate every room in your home.
          </p>

          <Link to="/products">
            <Button
              variant="basePrimary"
              className="flex items-center gap-2 rounded-full w-full md:w-max mt-4"
            >
              Shop Now <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="rounded-md overflow-hidden">
          <img
            src={bigSofa}
            alt="hero-image"
            className="h-96 md:h-full w-full object-cover"
          />
        </div>
      </main>
    </div>
  );
}
