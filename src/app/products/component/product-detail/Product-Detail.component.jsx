"use client";

import React, { useContext, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ButtonComponent,
  ButtonLinkComponent,
} from "@/components/button/button.component";

import { CartContext } from "@/contexts/CartContext";

import BiCartPlus from "@/icons/BiCartPlus";
import IconParkOutlineProtect from "@/icons/IconParkOutlineProtect";
import MaterialSymbolsArrowBackIosRounded from "@/icons/MaterialSymbolsArrowBackIosRounded";
import MaterialSymbolsStarRounded from "@/icons/MaterialSymbolsStarRounded";
import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line";
import MingcuteShoppingCart2Line from "@/icons/MingcuteShoppingCart2Line";
import SolarSettingsOutline from "@/icons/SolarSettingsOutline";
import SolarShopLinear from "@/icons/SolarShopLinear";

import { enTofa } from "@/utils/Utilities";

import styles from "./product-detail.module.css";

export default function ProductDetailComponent({ product, id }) {
  let { cart, addToCart, removeFromCart } =
    useContext(CartContext);

  const handleHasProduct = () => {
    const findProduct = cart?.find((item) => item.id === id);
    if (findProduct !== undefined) {
      return false;
    }
    return true;
  };
  
  return (
    <div className={styles["product-detail"]}>
      <div className={styles["product-detail-content"]}>
        <div className={styles["product-info"]}>
          <span>دسته بندی:</span>
          <Link href={`/products?brand=${product.brand}`}>{product.brand}</Link>
          <h3 className={styles["product-title"]}>{product.title}</h3>
          <div className={styles["product-rate"]}>
            <MaterialSymbolsStarRounded
              color="#ffd000"
              width="1.2rem"
              height="1.2rem"
            />
            <span>{enTofa(product.rate)}</span>
          </div>
          <div className={styles["product-intro"]}>
            <h4>معرفی</h4>
            <p className={styles["product-description"]}>
              {product.description}
            </p>
          </div>
          <div className={styles["product-features"]}>
            <h4>ویژگی‌ها</h4>
            <ul>
              <li>
                <p>فناوری صفحه نمایش</p>
                <span>{product.screen}</span>
              </li>
              <li>
                <p>رزولوشن دوربین اصلی</p>
                <span>{product.resolution}</span>
              </li>
              <li>
                <p>زبان</p>
                <span>{product.language}</span>
              </li>
              <li>
                <p>نسخه سیستم عامل</p>
                <span>{product.os}</span>
              </li>
              <li>
                <p>اندازه</p>
                <span>{product.size}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["product-image"]}>
          <Image
            quality={100}
            width={300}
            height={300}
            src={product.image}
            alt={product.title}
          />
        </div>
      </div>
      <div className={styles["product-detail-price"]}>
        <div className={styles["product-shop"]}>
          <SolarShopLinear />
          <span>فروشگاه لاوین</span>
        </div>
        <div className={styles["product-operation"]}>
          <SolarSettingsOutline />
          <span>ارزیابی عملکرد: عالی</span>
        </div>
        <div className={styles["product-guaranty"]}>
          <IconParkOutlineProtect />
          <span>گارانتی ۱۸ ماهه شرکتی</span>
        </div>
        {product.price > 0 ? (
          <>
            <div className={styles["product-price"]}>
              {enTofa(product.price)}
              <span>تومان</span>
            </div>

            {handleHasProduct() ? (
              <ButtonComponent
                // variant="primary"
                // className={styles["product-button"]}
                onClick={() => addToCart(product)}
              >
                {/* <MingcuteShoppingCart2Line /> */}
                <BiCartPlus width="1.3rem" height="1.3rem" />
                افزودن به سبد خرید
              </ButtonComponent>
            ) : (
              <div className={styles["product-cartEmpty"]}>
                <ButtonComponent onClick={() => removeFromCart(product.id)}>
                  <MingcuteDelete2Line />
                </ButtonComponent>
                <ButtonLinkComponent href={"/cart"}>
                  مشاهده سبد خرید
                  <MaterialSymbolsArrowBackIosRounded />
                </ButtonLinkComponent>
              </div>
            )}
          </>
        ) : (
          <>
            <p className={styles["product-noExist"]}>ناموجود</p>
            <ButtonComponent
              variant="primary"
              className={styles["product-button"]}
            >
              موجود شد خبرم کن!{" "}
            </ButtonComponent>
          </>
        )}
      </div>
    </div>
  );
}
