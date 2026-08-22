"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/site";

export function NavigationLinks() {
  const pathname = usePathname();
  return navigation.map((item) => (
    <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}>
      {item.label}
    </Link>
  ));
}
