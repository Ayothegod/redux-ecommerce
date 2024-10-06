import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}
export function RootLayout({ children }: RootLayoutProps) {
  return <main className="font-inter">{children}</main>;
}
