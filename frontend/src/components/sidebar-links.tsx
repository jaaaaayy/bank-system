"use client";

import { usePathname } from "next/navigation";
import { ArrowRightLeft, PanelsRightBottom } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Accounts",
    url: "/accounts",
    icon: PanelsRightBottom,
  },
  {
    title: "Transfer",
    url: "/transfer",
    icon: ArrowRightLeft,
  },
];

const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton isActive={pathname.startsWith(item.url)} asChild>
            <Link href={item.url}>
              <item.icon
                className={`${item.title === "Accounts" && "rotate-180"}`}
              />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default SidebarLinks;
