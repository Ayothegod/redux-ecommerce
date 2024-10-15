import { baseNav } from "@/lib/data";
import clsx from "clsx";
import { Heart, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="body flex items-center justify-between h-12">
      <Logo />

      <ul className="flex gap-4 md:gap-8">
        {baseNav.map((data) => (
          <Link
            to={data.url}
            key={data.id}
            className={clsx(
              " text-white px-1",
              data.url !== path && "",
              data.url === path && "border-b border-b-amber-500"
            )}
          >
            <li>{data.title}</li>
          </Link>
        ))}
      </ul>

      <div className="text-white/70 flex">
        <Link to="/account" className="hidden">
          <div className="p-1 rounded-md border border-transparent hover:border-white transition-colors duration-200 ease-in-out cursor-pointer">
            <Heart className="hover:text-white" />
          </div>
        </Link>{" "}
        <Link to="/cart">
          <div className="p-1 rounded-md border border-transparent hover:border-white transition-colors duration-200 ease-in-out cursor-pointer">
            <ShoppingBag className="hover:text-white" />
          </div>
        </Link>
        <Link to="/account">
          <div className="p-1 rounded-md border border-transparent hover:border-white transition-colors duration-200 ease-in-out cursor-pointer">
            <User className="hover:text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
}
