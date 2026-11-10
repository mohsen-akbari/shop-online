"use client";

import React, { useContext } from "react";

import { FiltersContext } from "@/app/products/providers/filters/filters.provider";

import OcticonSortAsc16 from "@/icons/OcticonSortAsc16";

import styles from "./sorting-products.module.css";

const options = [
  { value: "بهترین", label: "بهترین" },
  { value: "بدترین", label: "بدترین" },
  { value: "ارزانترین", label: "ارزان‌ترین" },
  { value: "گرانترین", label: "گران‌ترین" },
];

export default function SortingProductsComponent() {
  const { dispatchFilters, filters } = useContext(FiltersContext);

  const selectedSort = filters.sort?.value || "بهترین";

  const handleSort = (selectedOption) => {
    if (selectedSort === selectedOption.value) return;

    dispatchFilters({
      type: "updated_filter",
      key: "sort",
      value: selectedOption,
    });
  };

  return (
    <div className={styles.sortContainer}>
      <div className={styles.sortButtons}>
        <div className={styles.sortTitle}>
          <OcticonSortAsc16 />
          <span>مرتب‌سازی:</span>
        </div>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSort(option)}
            className={`${styles.sortButton} ${
              selectedSort === option.value ? styles.active : ""
            }`}
            aria-pressed={selectedSort === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
