// import TopBar from "@/components/layout/TopBar";
import { TopBar } from "@/components/seller/TopBar";
import { sidebarData } from "@/lib/data";
import { AuthState } from "@/services/auth/types";
import clsx from "clsx";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export function SellerLayout({
  isAuthenticated,
  authState,
}: {
  isAuthenticated: boolean;
  authState: AuthState;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  // console.log(path);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/auth/login");
    }
    if (isAuthenticated) {
      if (authState.user?.accountType === "SHOPPER") {
        return navigate("/");
      }
    }
    return;
  }, [isAuthenticated, navigate, authState.user?.accountType]);

  if (!isAuthenticated) {
    return null;
  }

  if (authState.user?.accountType === "SHOPPER") {
    return null;
  }

  return (
    <div className="">
      <section className="max-w-7x mx-auto flex">
        {/* DESKTOP-SIDEBAR */}
        <div className="hidden md:sticky h-screen md:top-0 md:flex md:w-60 border flex-shrink-0 px-2 py-4">
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
                    "flex items-center gap-4 p-2 rounded-md font-medium border border-white ",
                    data.url !== path &&
                      "text-neutral-500 hover:border-base hover:text-",
                    data.url === path && "bg-base text-white"
                  )}
                >
                  <data.icon className="w-5 h-5" />
                  <li>{data.title}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full bg-neutral-100 min-h-screen flex-grow px-4">
          <TopBar authState={authState} />
          <div className="md:px-3">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}
