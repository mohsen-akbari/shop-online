"use client";

import { useContext, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import clsx from "clsx";

import SignOutButtonComponent from "@/app/dashboard/component/sign-out-button/sign-out-button.component";

import logo from "@/assets/logo/lavinSvg.svg";

import { CartContext } from "@/contexts/CartContext";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line";
import MingcuteExitLine from "@/icons/MingcuteExitLine";
import MingcuteHome3Line from "@/icons/MingcuteHome3Line";
import MingcuteListCheck2Line from "@/icons/MingcuteListCheck2Line";
import MingcuteShoppingCart2Line from "@/icons/MingcuteShoppingCart2Line";
import MingcuteUser2Line from "@/icons/MingcuteUser3Line";

import { fetchWithToast } from "@/utils/fetch-utils";

import { ButtonLinkComponent } from "../button/button.component";
import { ButtonComponent } from "../button/button.component";

import styles from "./header.module.css";

export default function HeaderComponent() {
  const { cart } = useContext(CartContext);

  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState({
    open: false,
  });

  const openSingOutModal = () => {
    setDeleteModal({
      open: true,
    });
  };

  const closeSingOutModal = () => {
    setDeleteModal({
      open: false,
    });
  };

  const signOutClickHandler = async () => {
    const result = await fetchWithToast(
      "/api/auth/sign-out",
      {
        method: "POST",
      },
      "خروج با موفقیت انجام شد.",
    );

    if (result.error) {
      return;
    }

    closeSingOutModal();

    router.replace("/auth/sign-in");
    router.refresh();
  };

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
                  <MingcuteListCheck2Line height="1.5rem" width="1.5rem" />
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
                  <MingcuteUser2Line height="1.4rem" width="1.4rem" />
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
            <SignOutButtonComponent openSingOutModal={openSingOutModal} />
          </div>
        </div>
      </header>
      {deleteModal.open && (
        <div className={styles.modalOverlay} onClick={closeSingOutModal}>
          <div
            className={styles.deleteModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalIcon}>
              <MingcuteExitLine width="1.5rem" height="1.5rem" />
            </div>

            <h3>خروج از حساب کاربری</h3>

            <p>آیا مطمئن هستید که می‌خواهید را از حساب کاربری خارج شوید ؟</p>

            <div className={styles.modalActions}>
              <ButtonComponent
                shape=""
                className={styles.cancelButton}
                onClick={closeSingOutModal}
              >
                خیر
              </ButtonComponent>

              <ButtonComponent
                shape=""
                className={styles.confirmButton}
                onClick={signOutClickHandler}
              >
                بله، خارج می شوم
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
