// "use client";

// import { createContext, useEffect, useState } from "react";

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState();

//   useEffect(() => {
//     const cartLocal = localStorage.getItem("cart");

//     if (cartLocal) {
//       setCart(
//         !!JSON.parse(cartLocal) === undefined ? [] : JSON.parse(cartLocal),
//       );
//     }
//   }, []);

//   useEffect(() => {
//     if (cart !== undefined) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart]);

//   function addToCart(product) {
//     setCart((prev) => {
//       let selectedProduct = prev?.find((item) => item.id === product.id);

//       if (!selectedProduct) {
//         return [...prev, { ...product, quantity: 1 }];
//       } else {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item,
//         );
//       }
//     });
//   }

//   function removeFromCart(productId) {
//     setCart((prev) => prev?.filter((product) => product.id !== productId));
//   }

//   function updateQuantity(productId, newQuantity) {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === productId ? { ...item, quantity: newQuantity } : item,
//       ),
//     );
//   }

//   function getTotal() {
//     let total = 0;
//     cart.forEach((item) => (total += item.quantity * item.price));

//     return total;
//   }

//   function getAny(product) {
//     let total = 0;
//     total += product.quantity * product.price;
//     return total;
//   }

//   function clearCart() {
//     setCart([]);
//   }

//   function getInsurance(product) {
//     let total = 0;
//     total += product.quantity * product.price * 0.015;
//     return total;
//   }

//   function getInsuranceTotal() {
//     let total = 0;
//     cart.map((product) =>
//       product?.insurance === true
//         ? (total += product.quantity * product.price * 0.015)
//         : total,
//     );
//     return total;
//   }

//   function getTotalAll() {
//     let total = 0;
//     cart.forEach(
//       (item) =>
//         (total +=
//           item.quantity * item.price +
//           (item?.insurance ? item.quantity * item.price * 0.015 : 0)),
//     );

//     return total;
//   }

//   function changeInsurance(product, checkInsurance) {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === product.id ? { ...item, insurance: checkInsurance } : item,
//       ),
//     );
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         getAny,
//         getTotal,
//         clearCart,
//         getInsurance,
//         changeInsurance,
//         getInsuranceTotal,
//         getTotalAll,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// "use client";

// import { createContext, useEffect, useState } from "react";

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   // بهتر است cart از ابتدا آرایه باشد
//   const [cart, setCart] = useState([]);

//   // گرفتن سبد خرید از localStorage
//   useEffect(() => {
//     const cartLocal = localStorage.getItem("cart");

//     if (cartLocal) {
//       try {
//         const parsedCart = JSON.parse(cartLocal);

//         setCart(Array.isArray(parsedCart) ? parsedCart : []);
//       } catch (error) {
//         console.error("Cart parse error:", error);
//         setCart([]);
//       }
//     }
//   }, []);

//   // ذخیره سبد خرید در localStorage
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // اضافه کردن محصول
//   function addToCart(product) {
//     setCart((prev) => {
//       const selectedProduct = prev.find((item) => item.id === product.id);

//       // محصول جدید
//       if (!selectedProduct) {
//         return [
//           ...prev,
//           {
//             ...product,
//             quantity: 1,
//           },
//         ];
//       }

//       // محصول قبلاً وجود دارد
//       return prev.map((item) =>
//         item.id === product.id
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
//             }
//           : item,
//       );
//     });
//   }

//   // حذف محصول
//   function removeFromCart(productId) {
//     setCart((prev) => prev.filter((product) => product.id !== productId));
//   }

//   // تغییر تعداد
//   function updateQuantity(productId, newQuantity) {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === productId
//           ? {
//               ...item,
//               quantity: newQuantity,
//             }
//           : item,
//       ),
//     );
//   }

//   // مجموع قیمت
//   function getTotal() {
//     return cart.reduce(
//       (total, item) => total + item.quantity * Number(item.price),
//       0,
//     );
//   }

//   // قیمت یک محصول
//   function getAny(product) {
//     return product.quantity * Number(product.price);
//   }

//   // خالی کردن سبد
//   function clearCart() {
//     setCart([]);
//   }

//   // بیمه یک محصول
//   function getInsurance(product) {
//     return product.quantity * Number(product.price) * 0.015;
//   }

//   // مجموع بیمه
//   function getInsuranceTotal() {
//     return cart.reduce(
//       (total, product) =>
//         product?.insurance === true
//           ? total + product.quantity * Number(product.price) * 0.015
//           : total,
//       0,
//     );
//   }

//   // مجموع قیمت + بیمه
//   function getTotalAll() {
//     return cart.reduce((total, item) => {
//       const price = item.quantity * Number(item.price);

//       const insurance = item?.insurance ? price * 0.015 : 0;

//       return total + price + insurance;
//     }, 0);
//   }

//   // تغییر وضعیت بیمه
//   function changeInsurance(product, checkInsurance) {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === product.id
//           ? {
//               ...item,
//               insurance: checkInsurance,
//             }
//           : item,
//       ),
//     );
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         getAny,
//         getTotal,
//         clearCart,
//         getInsurance,
//         changeInsurance,
//         getInsuranceTotal,
//         getTotalAll,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const cartLocal = localStorage.getItem("cart");

    if (cartLocal) {
      try {
        const parsedCart = JSON.parse(cartLocal);

        setCart(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error("Cart parse error:", error);
        setCart([]);
      }
    }

    setIsLoaded(true);
  }, []);

  // ذخیره سبد در localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  function addToCart(product) {
    setCart((prev) => {
      const selectedProduct = prev.find((item) => item.id === product.id);

      if (!selectedProduct) {
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      return prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, newQuantity) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item,
      ),
    );
  }

  function clearCart() {
    setCart([]);
  }

  function getTotal() {
    return cart.reduce(
      (total, item) => total + item.quantity * Number(item.price),
      0,
    );
  }

  function getAny(product) {
    return product.quantity * Number(product.price);
  }

  function getInsurance(product) {
    return product.quantity * Number(product.price) * 0.015;
  }

  function getInsuranceTotal() {
    return cart.reduce((total, product) => {
      if (product.insurance === true) {
        return total + product.quantity * Number(product.price) * 0.015;
      }

      return total;
    }, 0);
  }

  function getTotalAll() {
    return cart.reduce((total, item) => {
      const price = item.quantity * Number(item.price);

      const insurance = item.insurance ? price * 0.015 : 0;

      return total + price + insurance;
    }, 0);
  }

  function changeInsurance(product, checkInsurance) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              insurance: checkInsurance,
            }
          : item,
      ),
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        getAny,
        getTotal,
        clearCart,
        getInsurance,
        changeInsurance,
        getInsuranceTotal,
        getTotalAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
