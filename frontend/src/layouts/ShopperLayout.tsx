import { Outlet } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/base/Header";

export function ShopperLayout() {
  return (
    <div className="">
      <section className="bg-base">
        <Header />
      </section>
      ShopperLayoiuu
      <Outlet />
    </div>
  );
}
