import { AuthState } from "@/services/auth/types";
// import { Bell, ChevronDown } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Label } from "../ui/label";
// absolute top-[50%] left-[10%] translate-x-[-50%] translate-y-[-50%] cursor-pointer

export function AdminBar({ authState }: { authState: AuthState }) {
  // console.log(authState, isAuthenticated);

  return (
    <main className="px-2 py-2 flex justify-between items-center">
      {/* <div>
        <div className="relative w-2/3 rounded-md px-2 py-2 bg-white">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 " />
          </div>
          <input
            type="text"
            placeholder="Search for"
            className="w-full ml-8 bg-transparent border-none outline-none"
          />
        </div>
      </div> */}

      <div className="ml-auto">
        <div className="flex items-center gap-2">
          {/* <div className="p-3 rounded-md bg-white w-max shadow-sm">
            <Bell className="" />
          </div> */}
          <div className="bg-white w-max p-2 rounded-md flex items-center gap-2 shadow-sm">
            {/* <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            <Link to="/seller/settings">
              <aside>
                <p className="text-sm leading-3">{authState.user?.email}</p>
                <Label className="font-light text-xs">Admin Account</Label>
              </aside>
            </Link>
            <div>{/* <ChevronDown className="cursor-pointer" /> */}</div>
          </div>
        </div>

        {/* MOBILE-MENU  */}
        <div className="hidden md:">Sidebar</div>
      </div>
    </main>
  );
}
