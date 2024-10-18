import {
  LayoutDashboard,
  NotebookPen,
  Settings,
  SquareChartGantt
} from "lucide-react";

export const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    url: "/seller/dashboard",
    icon: LayoutDashboard,
  },
  { id: 2, title: "Orders", url: "/seller/orders", icon: NotebookPen },
  { id: 3, title: "Products", url: "/seller/products", icon: SquareChartGantt },
  // { id: 4, title: "Customers", url: "/Accounts", icon: Users },
  // { id: 5, title: "Messages", url: "/Accounts", icon: MessageSquare },
  { id: 6, title: "Settings", url: "/seller/settings", icon: Settings },
];

export const baseNav = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  { id: 2, title: "Products", url: "/products" },
  { id: 4, title: "About Us", url: "/about" },
  { id: 5, title: "Contact Us", url: "/contact" },
  { id: 6, title: "Blog", url: "/blog" },
];
