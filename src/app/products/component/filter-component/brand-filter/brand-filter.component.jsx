// "use client";

// import { useContext, useEffect, useState } from "react";

// import { FiltersContext } from "@/app/products/providers/filters/filters.provider";

// import CardComponent from "@/components/card/card.component";

// import styles from "./brand-filter.module.css";

// const options = ["سامسونگ", "شیائومی", "اپل"];

// export default function BrandFilterComponent() {
//   const { dispatchFilters, filters } = useContext(FiltersContext);
//   const [select, setSelect] = useState("");
//   const buttonClickHandler = (value) => {
//     dispatchFilters({ type: "updated_filter", key: "brand", value });
//     setSelect(value);
//   };

//   const buttonClickRemoveHandler = () => {
//     dispatchFilters({ type: "removed_filter", key: "brand" });
//     setSelect("");
//   };

//   return (
//     <CardComponent>
//       <h3>برند</h3>
//       <ul className={styles["brand-filter"]}>
//         <li>
//           <button
//             type="button"
//             onClick={() => buttonClickRemoveHandler()}
//             className={select === "" ? styles.active : ""}
//           >
//             همه
//           </button>
//         </li>
//         {options.map((x) => (
//           <li key={x}>
//             <button
//               type="button"
//               onClick={() => buttonClickHandler(x)}
//               className={x === select ? styles.active : ""}
//             >
//               {x}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </CardComponent>
//   );
// }

"use client";

import { useContext } from "react";

import { FiltersContext } from "@/app/products/providers/filters/filters.provider";

import CardComponent from "@/components/card/card.component";

import styles from "./brand-filter.module.css";

const options = ["سامسونگ", "شیائومی", "اپل"];

export default function BrandFilterComponent() {
  const { dispatchFilters, filters } = useContext(FiltersContext);

  const select = filters.brand ?? "";

  function buttonClickHandler(value) {
    dispatchFilters({
      type: "updated_filter",
      key: "brand",
      value,
    });
  }

  function buttonClickRemoveHandler() {
    dispatchFilters({
      type: "removed_filter",
      key: "brand",
    });
  }

  return (
    <CardComponent>
      <h3>برند</h3>

      <ul className={styles["brand-filter"]}>
        <li>
          <button
            type="button"
            onClick={buttonClickRemoveHandler}
            className={select === "" ? styles.active : ""}
          >
            همه
          </button>
        </li>

        {options.map((brand) => (
          <li key={brand}>
            <button
              type="button"
              onClick={() => buttonClickHandler(brand)}
              className={select === brand ? styles.active : ""}
            >
              {brand}
            </button>
          </li>
        ))}
      </ul>
    </CardComponent>
  );
}
