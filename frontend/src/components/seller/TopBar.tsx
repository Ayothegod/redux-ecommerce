import { Bell, Search } from "lucide-react";
// absolute top-[50%] left-[10%] translate-x-[-50%] translate-y-[-50%] cursor-pointer

export function TopBar() {
  return (
    <main className="px-2 py-2 flex justify-between items-center">
      <div>
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
      </div>

      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-white w-max">
            <Bell className="h-4 w-4" />
          </div>
          <div className="bg-white w-max p-2 rounded-md">
            <p className="font-semibold text-sm font-space-grotesk ">Hello, Aiomide</p>
          </div>
        </div>

        {/* MOBILE-MENU  */}
        <div className="hidden md:">Sidebar</div>
      </div>
    </main>
  );
}
