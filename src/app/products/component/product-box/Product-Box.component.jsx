"use client";

import { useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { ButtonComponent } from "@/components/button/button.component";
import { ButtonLinkComponent } from "@/components/button/button.component";

import { CartContext } from "@/contexts/CartContext";

import BiCartPlus from "@/icons/BiCartPlus";
import CarbonShoppingCartPlus from "@/icons/CarbonShoppingCartPlus";
import IconamoonSignMinus from "@/icons/IconamoonSignMinus";
import MajesticonsEyeLine from "@/icons/MajesticonsEyeLine";
import MaterialSymbolsStarRounded from "@/icons/MaterialSymbolsStarRounded";
import MingcuteAddLine from "@/icons/MingcuteAddLine";
import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line";

import { enTofa } from "@/utils/Utilities";

import styles from "./product-Box.module.css";

// export default function ProductBox({ product }) {
//   let { cart, addToCart, updateQuantity, removeFromCart } =
//     useContext(CartContext);

//   const handleHasProduct = (product) => {
//     const findProduct = cart?.find((item) => item.id === product.id);
//     if (findProduct !== undefined) {
//       return false;
//     }
//     return true;
//   };

//   const cartItem = cart?.find((item) => item.id === product.id);

//   function counterPlus(count) {
//     count++;
//     return count;
//   }

//   function counterSubtraction(count) {
//     count--;
//     return count;
//   }

//   console.log(product.id);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.box}>
//         <div className={styles["product-image-box"]}>
//           <Image
//             quality={100}
//             width={200}
//             height={200}
//             src={product.image}
//             alt={product.title}
//           />
//         </div>
//         <div className={styles["product-info-box"]}>
//           <div className={styles["product-title"]}>{product.title}</div>
//           <div className={styles["product-rate"]}>
//             <span>{enTofa(product.rate)}</span>
//             <MaterialSymbolsStarRounded
//               color="#ffc400"
//               width="1.2rem"
//               height="1.2rem"
//             />
//           </div>
//           <div className={styles["product-actions"]}>
//             <ButtonLinkComponent
//               href={`/products/${product.id}`}
//               className={styles["product-view"]}
//             >
//               <MajesticonsEyeLine width="1.5rem" height="1.5rem" />
//               مشاهده محصول
//             </ButtonLinkComponent>
//             {handleHasProduct(product) ? (
//               <ButtonComponent
//                 type="button"
//                 className={styles["add-to-cart"]}
//                 onClick={() => addToCart(product)}
//               >
//                 <BiCartPlus width="1.5rem" height="1.5rem" />
//                 افزودن به سبد خرید
//               </ButtonComponent>
//             ) : (
//               <ButtonComponent>
//                 <div className={styles["left-count"]}>
//                   {item.quantity > 1 ? (
//                     <ButtonComponent
//                       onClick={() =>
//                         updateQuantity(
//                           item.id,
//                           counterSubtraction(item.quantity),
//                         )
//                       }
//                     >
//                       <IconamoonSignMinus />
//                     </ButtonComponent>
//                   ) : (
//                     <ButtonComponent onClick={() => removeFromCart(product.id)}>
//                       <MingcuteDelete2Line
//                         width="1.2rem"
//                         height="1.2rem"
//                         className={styles.red}
//                       />
//                     </ButtonComponent>
//                   )}
//                   <span>{enTofa(item.quantity)}</span>
//                   <ButtonComponent
//                     onClick={() =>
//                       updateQuantity(item.id, counterPlus(item.quantity))
//                     }
//                   >
//                     <MingcuteAddLine />
//                   </ButtonComponent>
//                 </div>
//               </ButtonComponent>
//             )}
//           </div>
//           {product.price == "0" ? (
//             <div className={styles["product-price-row"]}>
//               <div className={styles["product-price"]}>
//                 <div className={styles["product-non-existent"]}>ناموجود</div>
//               </div>
//             </div>
//           ) : (
//             <div className={styles["product-price-row"]}>
//               <div className={styles["product-price"]}>
//                 {enTofa(product.price)}
//                 <span>تومان</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ProductBox({ product }) {
//   const { cart, addToCart, updateQuantity, removeFromCart } =
//     useContext(CartContext);

//   // محصول فعلی داخل سبد
//   const cartItem = cart.find((item) => item.id === product.id);

//   // اضافه کردن
//   const handleAddToCart = () => {
//     addToCart(product);
//   };

//   // افزایش تعداد
//   const handlePlus = () => {
//     updateQuantity(product.id, cartItem.quantity + 1);
//   };

//   // کاهش تعداد
//   const handleMinus = () => {
//     if (cartItem.quantity > 1) {
//       updateQuantity(product.id, cartItem.quantity - 1);
//     } else {
//       removeFromCart(product.id);
//     }
//   };
//   return (
//     <div className={styles.wrapper}>
//       {" "}
//       <div className={styles.box}>
//         {" "}
//         {/* Image */}{" "}
//         <div className={styles["product-image-box"]}>
//           {" "}
//           <Image
//             quality={100}
//             width={200}
//             height={200}
//             src={product.image}
//             alt={product.title}
//           />{" "}
//         </div>{" "}
//         <div className={styles["product-info-box"]}>
//           {" "}
//           {/* Title */}{" "}
//           <div className={styles["product-title"]}> {product.title} </div>{" "}
//           {/* Rate */}{" "}
//           <div className={styles["product-rate"]}>
//             {" "}
//             <span> {enTofa(product.rate)} </span>{" "}
//             <MaterialSymbolsStarRounded
//               color="#ffc400"
//               width="1.2rem"
//               height="1.2rem"
//             />{" "}
//           </div>{" "}
//           {/* Actions */}{" "}
//           <div className={styles["product-actions"]}>
//             {" "}
//             {/* View */}{" "}
//             <ButtonLinkComponent
//               href={`/products/${product.id}`}
//               className={styles["product-view"]}
//             >
//               {" "}
//               <MajesticonsEyeLine width="1.5rem" height="1.5rem" /> مشاهده محصول{" "}
//             </ButtonLinkComponent>{" "}
//             {/* Cart */}{" "}
//             {!cartItem ? (
//               // Add to cart
//               <ButtonComponent
//                 type="button"
//                 className={styles["add-to-cart"]}
//                 onClick={handleAddToCart}
//               >
//                 {" "}
//                 <BiCartPlus width="1.5rem" height="1.5rem" /> افزودن به سبد خرید{" "}
//               </ButtonComponent>
//             ) : (
//               <div className={styles.count}>
//                 {" "}
//                 {/* Minus / Delete */}{" "}
//                 <ButtonComponent type="button" onClick={handleMinus}>
//                   {" "}
//                   {cartItem.quantity > 1 ? (
//                     <IconamoonSignMinus />
//                   ) : (
//                     <MingcuteDelete2Line
//                       width="1rem"
//                       height="1rem"
//                       className={styles.red}
//                     />
//                   )}{" "}
//                 </ButtonComponent>{" "}
//                 {/* Count */} <span> {enTofa(cartItem.quantity)} </span>{" "}
//                 {/* Plus */}{" "}
//                 <ButtonComponent type="button" onClick={handlePlus}>
//                   {" "}
//                   <MingcuteAddLine />{" "}
//                 </ButtonComponent>{" "}
//               </div>
//             )}{" "}
//           </div>{" "}
//           {/* Price */}{" "}
//           {product.price == 0 ? (
//             <div className={styles["product-price-row"]}>
//               {" "}
//               <div className={styles["product-price"]}>
//                 {" "}
//                 <div className={styles["product-non-existent"]}>
//                   {" "}
//                   ناموجود{" "}
//                 </div>{" "}
//               </div>{" "}
//             </div>
//           ) : (
//             <div className={styles["product-price-row"]}>
//               {" "}
//               <div className={styles["product-price"]}>
//                 {" "}
//                 {enTofa(product.price)} <span>تومان</span>{" "}
//               </div>{" "}
//             </div>
//           )}{" "}
//         </div>{" "}
//       </div>{" "}
//     </div>
//   );
// }

export default function ProductBox({ product }) {
  const { cart, isLoaded, addToCart, updateQuantity, removeFromCart } =
    useContext(CartContext);

  if (!isLoaded) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles["product-image-box"]}>
            <Image
              quality={100}
              width={200}
              height={200}
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className={styles["product-info-box"]}>
            <div className={styles["product-title"]}>{product.title}</div>

            <div className={styles["product-actions"]}>
              <div className={styles.cartLoading}>...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);

  const handlePlus = () => {
    updateQuantity(product.id, cartItem.quantity + 1);
  };

  const handleMinus = () => {
    if (cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        {/* Image */}
        <div className={styles["product-image-box"]}>
          <Image
            quality={100}
            width={200}
            height={200}
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className={styles["product-info-box"]}>
          {/* Title */}
          <div className={styles["product-title"]}>{product.title}</div>

          {/* Rate */}
          <div className={styles["product-rate"]}>
            <span>{enTofa(product.rate)}</span>

            <MaterialSymbolsStarRounded
              color="#ffc400"
              width="1.2rem"
              height="1.2rem"
            />
          </div>

          <div className={styles["product-actions"]}>
            <ButtonLinkComponent
              href={`/products/${product.id}`}
              className={styles["product-view"]}
            >
              <MajesticonsEyeLine width="1.5rem" height="1.5rem" />
              مشاهده محصول
            </ButtonLinkComponent>

            {!cartItem ? (
              <ButtonComponent
                type="button"
                className={styles["add-to-cart"]}
                onClick={() => addToCart(product)}
              >
                <BiCartPlus width="1.5rem" height="1.5rem" />
                افزودن به سبد خرید
              </ButtonComponent>
            ) : (
              <div className={styles.count}>
                {/* Minus / Delete */}
                <ButtonComponent type="button" onClick={handleMinus}>
                  {cartItem.quantity > 1 ? (
                    <IconamoonSignMinus color="#000" />
                  ) : (
                    <MingcuteDelete2Line
                      width="1.2rem"
                      height="1.2rem"
                      className={styles.red}
                    />
                  )}
                </ButtonComponent>

                {/* Quantity */}
                <span>{enTofa(cartItem.quantity)}</span>

                <ButtonComponent type="button" onClick={handlePlus}>
                  <MingcuteAddLine color="#000" />
                </ButtonComponent>
              </div>
            )}
          </div>

          {product.price == 0 ? (
            <div className={styles["product-price-row"]}>
              <div className={styles["product-price"]}>
                <div className={styles["product-non-existent"]}>ناموجود</div>
              </div>
            </div>
          ) : (
            <div className={styles["product-price-row"]}>
              <div className={styles["product-price"]}>
                {enTofa(product.price)}
                <span>تومان</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
