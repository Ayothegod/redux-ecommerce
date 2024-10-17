/* eslint-disable @typescript-eslint/no-explicit-any */
import { Footer } from "@/components/base/Footer";
import { Header } from "@/components/base/Header";
import { Info } from "@/components/base/Info";
import { AuthState } from "@/services/auth/types";
import { useGetCartQuery } from "@/services/products/productSlice";
import { Outlet } from "react-router-dom";

export function ShopperLayout({
  isAuthenticated,
  authState,
}: {
  isAuthenticated: boolean;
  authState: AuthState;
}) {
  const id =  authState.user?.id
  const { data } = useGetCartQuery(id as string);
  // console.log(data);

  return (
    <div className="">
      <section className="bg-base">
        <Header isAuthenticated={isAuthenticated} items={data} />
      </section>
      <Outlet />
      <Info />
      <Footer />
    </div>
  );
}
