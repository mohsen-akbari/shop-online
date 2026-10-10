"use client";

import { useContext, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import SignOutButtonComponent from "@/app/dashboard/component/sign-out-button/sign-out-button.component";

import logo from "@/assets/logo/lavinSvg.svg";

import { CartContext } from "@/contexts/CartContext";

import MingcuteExitLine from "@/icons/MingcuteExitLine";
import MingcuteHome3Line from "@/icons/MingcuteHome3Line";
import MingcuteListCheck2Line from "@/icons/MingcuteListCheck2Line";
import MingcuteShoppingCart2Line from "@/icons/MingcuteShoppingCart2Line";
import MingcuteUser2Line from "@/icons/MingcuteUser3Line";

import { ButtonLinkComponent } from "../button/button.component";
import { ButtonComponent } from "../button/button.component";

import styles from "./header.module.css";

export default function HeaderComponent() {
  const { cart } = useContext(CartContext);

  const pathname = usePathname();
  const id = pathname.split("/")[2];

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-container"]}>
          <nav>
            <div className={styles.img}>
              {/* <Image src={logo} width={100} height={70} alt="" /> */}
              <b>◆</b>
              <span>لاوین</span>
            </div>
            <ul>
              <li>
                <Link
                  href="/"
                  className={clsx(pathname === "/" && styles.active)}
                >
                  <MingcuteHome3Line height="1.5rem" width="1.5rem" />
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  href="/products?sort=بهترین"
                  className={clsx(
                    (pathname === "/products" ||
                      pathname === `/products/${id}`) &&
                      styles.active,
                  )}
                >
                  <MingcuteListCheck2Line  height="1.5rem" width="1.5rem" />
                  محصولات
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={clsx(
                    pathname === "/dashboard/profile" && styles.active,
                  )}
                >
                  <MingcuteUser2Line  height="1.4rem" width="1.4rem" />
                  پروفایل
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles["button-container"]}>
            <ButtonLinkComponent variant="primary" href="/cart">
              <MingcuteShoppingCart2Line />
              سبد خرید
              {cart?.length > 0 && (
                <div className={styles.counter}>{cart.length}</div>
              )}
            </ButtonLinkComponent>
            {/* <ButtonComponent variant="primary">
            {" "}
            <MingcuteExitLine color="var(--color-danger)" />
            خروج
          </ButtonComponent> */}
            <SignOutButtonComponent />
          </div>
        </div>
      </header>
    </>
  );
}
