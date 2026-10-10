"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import SignOutButtonComponent from "@/app/dashboard/component/sign-out-button/sign-out-button.component";

import MaterialSymbolsShoppingBagOutline from "@/icons/MaterialSymbolsShoppingBagOutline";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import TablerMessage from "@/icons/TablerMessage";

import styles from "./sidebar.module.css";

const items = [
  {
    title: "ویرایش پروفایل",
    href: "/dashboard/profile",
    icon: <MingcuteUser3Line />,
  },
  {
    title: "سفارش ها",
    href: "/dashboard/orders",
    icon: <MaterialSymbolsShoppingBagOutline />,
  },
  {
    title: "پیام ها",
    href: "/dashboard/messages",
    icon: <TablerMessage />,
  },
];

export default function SidebarComponent() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav aria-label="Pages in Dashboard">
        <ul>
          {items.map((item) => (
            <li
              key={item.title}
              className={clsx(
                styles.item,
                pathname === item.href && styles.active,
              )}
            >
              <Link href={item.href}>
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <SignOutButtonComponent className={styles.item} /> */}
    </aside>
  );
}
