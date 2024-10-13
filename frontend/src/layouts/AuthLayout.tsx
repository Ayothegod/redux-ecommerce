import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="bg-main min-h-screen flex">
      <div className="hidden md:flex font-space-grotesk text-white text-4xl md:w-[30%] min-h-screen">
        Big Bazzer
      </div>
      <div className="flex flex-1 w-full p-1">
        <Outlet />
      </div>
    </div>
  );
}
