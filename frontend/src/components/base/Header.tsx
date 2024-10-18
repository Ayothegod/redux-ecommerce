/* eslint-disable @typescript-eslint/no-explicit-any */
import { cartItem } from "@/services/products/types";
import { Heart, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { baseNav } from "@/lib/data";
import clsx from "clsx";
import { Button } from "../ui/button";
import { AuthState } from "@/services/auth/types";
import { useEffect, useState } from "react";

export function Header({
  isAuthenticated,
  items,
  authState,
}: {
  isAuthenticated: boolean;
  items: cartItem | undefined;
  authState: AuthState;
}) {
  const location = useLocation();
  const path = location.pathname;

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if the role is available in the authState
    if (authState.user?.accountType) {
      setRole(authState.user.accountType);
    } else {
      // If not in authState, check sessionStorage
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setRole(parsedUser.accountType || null); // Ensure we get the accountType
        } catch (error) {
          console.error("Error parsing sessionStorage user data:", error);
          setRole(null);
        }
      }
    }
  }, [authState]);

  return (
    <div className="body flex items-center justify-between h-12">
      <Logo className="text-3xl text-white" />

      <ul className="hidden md:flex gap-4 md:gap-8">
        {baseNav.map((data) => (
          <Link
            to={data.url}
            key={data.id}
            className={clsx(
              " text-white px-1 hover:border-b hover:border-b-baseAccent",
              data.url !== path && "",
              data.url === path && "border-b border-b-baseAccent"
            )}
          >
            <li>{data.title}</li>
          </Link>
        ))}
      </ul>
      {isAuthenticated ? (
        <div className="text-white/70 flex">
          <Link to="/account" className="hidden">
            <div className="p-1 rounded-md border border-transparent hover:border-white transition-colors duration-200 ease-in-out cursor-pointer">
              <Heart className="hover:text-white" />
            </div>
          </Link>{" "}
          <Link to="/products/cart" className="relative">
            <div className="absolute -top-1 -right-1 bg-white w-5 h-5 flex items-center justify-center rounded-full text-base text-sm">
              {items?.items.length}
            </div>
            <div className="p-1 rounded-md border border-transparent hover:border-white transition-colors duration-200 ease-in-out cursor-pointer">
              <ShoppingBag className="hover:text-white" />
            </div>
          </Link>
          {role === "SHOPPER" && (
            <Link to="/account">
              <div className="p-1 rounded-md border border-transparent hover:border-white transition-colors duration-200 ease-in-out cursor-pointer">
                <User className="hover:text-white" />
              </div>
            </Link>
          )}
          {role === "SELLER" && (
            <Link to="/seller/dashboard">
              <div className="p-1 rounded-md border border-transparent hover:border-white transition-colors duration-200 ease-in-out cursor-pointer">
                <User className="hover:text-white" />
              </div>
            </Link>
          )}
          {role === "ADMIN" && (
            <Link to="/admin/dashboard">
              <div className="p-1 rounded-md border border-transparent hover:border-white transition-colors duration-200 ease-in-out cursor-pointer">
                <User className="hover:text-white" />
              </div>
            </Link>
          )}
        </div>
      ) : (
        <Link to="/auth/login">
          <Button variant="basePrimary" className="rounded-full">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
