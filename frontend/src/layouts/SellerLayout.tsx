// import TopBar from "@/components/layout/TopBar";
import { TopBar } from "@/components/seller/TopBar";
import { sidebarData } from "@/lib/data";
import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";

export function SellerLayout() {
  const location = useLocation();
  const path = location.pathname;
  // console.log(path);

  return (
    <div className="">
      <section className="max-w-7x mx-auto flex">
        {/* DESKTOP-SIDEBAR */}
        <div className="hidden md:sticky h-screen md:top-0 md:flex md:w-[240px] border flex-shrink-0 px-2 py-4">
          <div className="w-full h-screen space-y-4">
            <div className="flex items-center gap-4 text-2xl font-bold">
              <span className=" font-space-grotesk">E-corng</span>
            </div>

            <ul className="flex flex-col gap-1">
              {sidebarData.map((data) => (
                <Link
                  to={data.url}
                  key={data.id}
                  className={clsx(
                    "flex items-center gap-4 p-2 rounded-md font-medium ",
                    data.url !== path &&
                      "text-neutral-500 hover:bg-blue-400/90 hover:text-white",
                    data.url === path && "bg-blue-400 text-white"
                  )}
                >
                  <data.icon className="w-5 h-5" />
                  <li>{data.title}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full bg-neutral-500 min-h-full flex-grow">
          <TopBar />
          <div className="px-3 font-space-grotesk">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}
