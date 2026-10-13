"use client";

import { useContext, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ButtonComponent } from "@/components/button/button.component";
import { ButtonLinkComponent } from "@/components/button/button.component";
import NormalInputComponent from "@/components/normal-input/normal-input.component";

import { CartContext } from "@/contexts/CartContext";

import IconamoonSignMinus from "@/icons/IconamoonSignMinus";
import MageBox3dCheck from "@/icons/MageBox3dCheck";
import MaterialSymbolsArrowBackIosRounded from "@/icons/MaterialSymbolsArrowBackIosRounded";
import MingcuteAddLine from "@/icons/MingcuteAddLine";
import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line";
import SolarShopLinear from "@/icons/SolarShopLinear";
import StreamlineFlexWarrantyBadgeHighlight from "@/icons/StreamlineFlexWarrantyBadgeHighlight";

import { enTofa } from "@/utils/Utilities";

import styles from "./cart-shop.module.css";

export default function CartShopComponent() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getAny,
    getTotal,
    clearCart,
    getInsurance,
    changeInsurance,
    getInsuranceTotal,
    getTotalAll,
  } = useContext(CartContext);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    type: null,
    product: null,
  });

  function counterPlus(count) {
    return count + 1;
  }

  function counterSubtraction(count) {
    return count - 1;
  }

  const openDeleteProductModal = (product) => {
    setDeleteModal({
      open: true,
      type: "product",
      product,
    });
  };

  const openClearCartModal = () => {
    setDeleteModal({
      open: true,
      type: "cart",
      product: null,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      open: false,
      type: null,
      product: null,
    });
  };

  const confirmDelete = () => {
    if (deleteModal.type === "product") {
      removeFromCart(deleteModal.product.id);
    }

    if (deleteModal.type === "cart") {
      clearCart();
    }

    closeDeleteModal();
  };
  return (
    <>
      <div className={styles["cart-container"]}>
        <div className={styles.list}>
          <div className={styles.header}>
            <div className={styles.title}>
              <h3>سبد خرید شما</h3>
              <span>{enTofa(cart.length)} عدد کالا</span>
            </div>

            <div className={styles.remove}>
              {/* <ButtonComponent onClick={() => clearCart()}>
                <span>حذف کل سبد خرید</span>

                <MingcuteDelete2Line width="22" height="22" />
              </ButtonComponent> */}
              <ButtonComponent onClick={openClearCartModal}>
                <span>حذف کل سبد خرید</span>
                <MingcuteDelete2Line width="22" height="22" />
              </ButtonComponent>
            </div>
          </div>

          <div className={styles.content}>
            {cart.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.img}>
                  <Link href={`/products/${item.id}`}>
                    <Image
                      quality={100}
                      src={item.image}
                      alt={item.title}
                      width={170}
                      height={170}
                      loading="lazy"
                    />
                  </Link>
                </div>

                <div className={styles.text}>
                  <Link href={`/products/${item.id}`}>
                    <h4>{item.title}</h4>
                  </Link>

                  <div className={styles.icon}>
                    <StreamlineFlexWarrantyBadgeHighlight color="#03519a" />

                    <span>{`${enTofa(18)} ماه گارانتی شرکتی`}</span>
                  </div>

                  <div className={styles.icon}>
                    <SolarShopLinear color="#03519a" />

                    <span>لاوین</span>
                  </div>

                  <div className={styles.icon}>
                    <MageBox3dCheck color="#03519a" />

                    <span>موجود در انبار لاوین</span>
                  </div>
                </div>

                <div className={styles.counter}>
                  <div className={styles["counter-left"]}>
                    <div className={styles["left-count"]}>
                      {item.quantity > 1 ? (
                        <ButtonComponent
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              counterSubtraction(item.quantity),
                            )
                          }
                        >
                          <IconamoonSignMinus />
                        </ButtonComponent>
                      ) : (
                        <ButtonComponent
                          onClick={() => openDeleteProductModal(item)}
                        >
                          <MingcuteDelete2Line
                            width="1.2rem"
                            height="1.2rem"
                            className={styles.red}
                          />
                        </ButtonComponent>
                      )}

                      <span>{enTofa(item.quantity)}</span>

                      <ButtonComponent
                        onClick={() =>
                          updateQuantity(item.id, counterPlus(item.quantity))
                        }
                      >
                        <MingcuteAddLine />
                      </ButtonComponent>
                    </div>

                    <div className={styles["left-value"]}>
                      {enTofa(getAny(item))}
                      <span>تومان</span>
                    </div>
                  </div>

                  <div className={styles.line}></div>

                  <div className={styles["counter-right"]}>
                    <div>
                      <NormalInputComponent
                        type="checkbox"
                        checked={item?.insurance ? true : false}
                        onChange={(event) =>
                          changeInsurance(item, event.target.checked)
                        }
                      />

                      <p>بیمه گوشی همراه - بیمه سامان</p>
                    </div>

                    <p>
                      {enTofa(getInsurance(item))}

                      <span>تومان</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.price}>
          <div className={styles.wrapper}>
            <h5>صورتحساب</h5>

            <div className={styles.box}>
              <div className={styles.item}>
                <span>قیمت محصولات</span>

                <div className={styles["item-money"]}>
                  <p>{enTofa(getTotal())}</p>

                  <span>تومان</span>
                </div>
              </div>

              <div className={styles.item}>
                <span>هزینه بیمه ها</span>

                <div className={styles["item-money"]}>
                  <p>{enTofa(getInsuranceTotal())}</p>

                  <span>تومان</span>
                </div>
              </div>

              <div className={styles.item}>
                <span>جمع کل</span>

                <div className={styles["item-money"]}>
                  <p>{enTofa(getTotalAll())}</p>

                  <span>تومان</span>
                </div>
              </div>

              <ButtonLinkComponent shape="" href={"/cart/shopping"}>
                ادامه خرید
                <MaterialSymbolsArrowBackIosRounded />
              </ButtonLinkComponent>
            </div>
          </div>
        </div>
      </div>

      {deleteModal.open && (
        <div className={styles.modalOverlay} onClick={closeDeleteModal}>
          <div
            className={styles.deleteModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalIcon}>
              <MingcuteDelete2Line width="25" height="25" />
            </div>

            <h3>
              {deleteModal.type === "cart" ? "حذف کل سبد خرید" : "حذف محصول"}
            </h3>

            <p>
              {deleteModal.type === "cart" ? (
                <>
                  آیا مطمئن هستید که می‌خواهید
                  <strong> تمام محصولات سبد خرید </strong>
                  را حذف کنید؟
                </>
              ) : (
                <>
                  آیا مطمئن هستید که می‌خواهید
                  <strong> «{deleteModal.product?.title}» </strong>
                  را از سبد خرید حذف کنید؟
                </>
              )}
            </p>

            <div className={styles.modalActions}>
              <ButtonComponent
                shape=""
                className={styles.cancelButton}
                onClick={closeDeleteModal}
              >
                خیر
              </ButtonComponent>

              <ButtonComponent
                shape=""
                className={styles.confirmButton}
                onClick={confirmDelete}
              >
                بله، حذف شود
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
