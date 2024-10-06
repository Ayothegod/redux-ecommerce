import { LayoutDashboard, MessageSquare, NotebookPen, Settings, SquareChartGantt, Users } from "lucide-react";

export const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    url: "/seller/dashboard",
    icon: LayoutDashboard,
  },
  { id: 2, title: "Orders", url: "/Analytics", icon: NotebookPen },
  { id: 3, title: "Products", url: "/Accounts", icon: SquareChartGantt },
  { id: 4, title: "Customers", url: "/Accounts", icon: Users },
  { id: 5, title: "Messages", url: "/Accounts", icon: MessageSquare },
  { id: 6, title: "Settings", url: "/Accounts", icon: Settings },
];
