"use client";

import { Vazirmatn } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";

import bannerTop from "@/../public/images/banner/banner-top.gif";
import { CartProvider } from "@/features/cart/providers/CartProviders";

import FooterComponent from "@/components/layout/footer/footer.component";
import HeaderComponent from "@/components/layout/header/header.component";
import ScrollTopComponent from "@/components/shared/scroll-top/scroll-top.component";
import ToasterComponent from "@/components/ui/toaster/toaster.component";

import "./globals.css";
import styles from "./layout.module.css";
import "@/app/styles/typography.css";

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
