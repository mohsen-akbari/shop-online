"use client";

import { useContext, useState } from "react";

import { FiltersContext } from "@/app/products/providers/filters/filters.provider";

import CardComponent from "@/components/card/card.component";

import styles from "./brand-filter.module.css";

const options = ["سامسونگ", "شیائومی", "اپل"];

export default function BrandFilterComponent() {
  const { dispatchFilters } = useContext(FiltersContext);
  const [select, setSelect] = useState("");
  const buttonClickHandler = (value) => {
    dispatchFilters({ type: "updated_filter", key: "brand", value });
    setSelect(value);
  };

  const buttonClickRemoveHandler = () => {
    dispatchFilters({ type: "removed_filter", key: "brand" });
    setSelect("");
  };
  return (
    <CardComponent>
      <h3>برند</h3>
      <ul className={styles["brand-filter"]}>
        <li>
          <button
            type="button"
            onClick={() => buttonClickRemoveHandler()}
            className={select === "" ? styles.active : ""}
          >
            همه
          </button>
        </li>
        {options.map((x) => (
          <li key={x}>
            <button
              type="button"
              onClick={() => buttonClickHandler(x)}
              className={x === select ? styles.active : ""}
            >
              {x}
            </button>
          </li>
        ))}
      </ul>
    </CardComponent>
  );
}
