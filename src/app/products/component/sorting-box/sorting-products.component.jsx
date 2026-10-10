"use client";

import React, { useContext, useEffect, useState } from "react";

import { FiltersContext } from "@/app/products/providers/filters/filters.provider";
import Select from "react-select";

import styles from "./sorting-products.module.css";

const options = [
  { value: "بهترین", label: "بهترین" },
  { value: "بدترین", label: "بدترین" },
  { value: "ارزانترین", label: "ارزانترین" },
  { value: "گرانترین", label: "گرانترین" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#fff",
    borderColor: state.isFocused ? "#fff" : "#ddd",
    boxShadow: state.isFocused ? "0 0 0 1px #ddd" : "none",
    "&:hover": {
      borderColor: "#c6c6c6",
    },
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#4f46e5"
      : state.isFocused
        ? "#f1f1f1"
        : "#fff",

    color: state.isSelected ? "#fff" : "#222",

    cursor: "pointer",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#222",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#999",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#555",
    "&:hover": {
      color: "#111",
    },
  }),

  clearIndicator: (base) => ({
    ...base,
    color: "#999",
    "&:hover": {
      color: "#111",
    },
  }),

  menu: (base) => ({
    ...base,
    borderRadius: "10px",
    overflow: "hidden",
  }),
};

export default function SortingProductsComponent() {
  const { dispatchFilters, filters } = useContext(FiltersContext);
  const [isSearchable, setIsSearchable] = useState(false);

  const handleChange = (selectedOption) => {
    dispatchFilters({
      type: "updated_filter",
      key: "sort",
      value: selectedOption,
    });
  };

  return (
    <div className={styles["select"]}>
      <Select
        styles={customStyles}
        defaultValue={filters.sort ? filters.sort : options[0]}
        onChange={handleChange}
        isSearchable={isSearchable}
        options={options}
      />
    </div>
  );
}
