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
import { useGetAllProductsQuery } from "@/services/products/productSlice";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: 10,
  });
  console.log(JSON.stringify(data, null, 2));

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
                <BreadcrumbPage className="text-lg text-white/50">
                  Products
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="py-10 body flex gap-4">
        <aside className="max-w-[22%] w-full">
          <h2>Filter Options</h2>
        </aside>
        <div className="w-full">
          <aside className="flex items-center justify-between mb-4">
            <p>
              Showing <span className="font-medium">1 - 10</span> of{" "}
              <span className="font-semibold">{data?.totalCount}</span> result
            </p>
            <div>Sort by: Latest</div>
          </aside>
          {isLoading ? (
            <div>Data is laoding</div>
          ) : error ? (
            <div className="text-red-500">Error: Error laoding data</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data?.products.map((product) => (
                <div key={product.id} className="w-full flex flex-col gap-2">
                  <Link to={`/products/${product.id}`}>
                    <div className="w-full h-48 rounded-md overflow-hidden">
                      <HandleImage
                        uploadedImage={product.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex items-center justify-between gap-2">
                    <Link to={`/products/${product.id}`}>
                      <div>
                        <p>{product.name}</p>
                        <div>
                          <p className="text-sm font-semibold">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <aside className="p-2 rounded-full bg-baseAccent w-max text-white cursor-pointer group-hover">
                      <ShoppingBag className="h-5 w-5 group:scale-125" />
                    </aside>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <Button onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </Button>
          </div>
        </div>
      </div>

      <Info />
      <Footer />
    </div>
  );
}
