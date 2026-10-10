"use client";

import { useContext, useEffect, useState } from "react";

import { FiltersContext } from "@/app/products/providers/filters/filters.provider";

import SelectComponent from "@/components/select/select.component";

const options = [
  { value: "best", label: "بهترین" },
  { value: "worst", label: "بدترین" },
  { value: "cheapest", label: "ارزانترین" },
  { value: "expensive", label: "گران ترین" },
];

export default async function SortComponent() {
  // const [selectedOption, setSelectedOption] = useState(options[0]);
  const { dispatchFilters } = useContext(FiltersContext);


  //  const handleChange = (selectedOption) => {
  //   dispatchFilters({
  //     type: "updated_filter",
  //     key: "sort",
  //     value: selectedOption,
  //   });
  // };
  

  return (
    <SelectComponent
      floating
      title="مرتب‌سازی"
      options={options}
      selectedOption={options[0].value}
      onSelectedOptionChange={handleChange}
      // onIsOpenChange={false}
    />
  );
}
