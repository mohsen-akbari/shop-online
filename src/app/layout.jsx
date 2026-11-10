"use client";

import { Vazirmatn } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";

import FooterComponent from "@/components/footer/footer.component";
import HeaderComponent from "@/components/header/header.component";
import ScrollTopComponent from "@/components/scroll-top/scroll-top.component";
import ToasterComponent from "@/components/toaster/toaster.component";

import { CartProvider } from "@/contexts/CartContext";

import "@/styles/typography.css";

import bannerTop from "../../public/images/banner-top/banner-top.gif";

import "./globals.css";
import styles from "./layout.module.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const isPublicRoute = ["/auth/sign-in", "/auth/sign-up"].includes(pathName);

  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body>
        <ScrollTopComponent />
        <a href="#" className={styles.link}>
          <Image src={bannerTop} alt="banner" width={1431} height={60} />
        </a>
        {!isPublicRoute ? (
          <CartProvider>
            <HeaderComponent />
            <div className={styles.layout}>
              <div className={styles.content}>{children}</div>
            </div>
            <p className="tagline">
              خرید آنلاین انواع گوشی همراه از فروشگاه لاوین{" "}
            </p>
            <FooterComponent />
          </CartProvider>
        ) : (
          children
        )}
        <ToasterComponent />
      </body>
    </html>
  );
}
