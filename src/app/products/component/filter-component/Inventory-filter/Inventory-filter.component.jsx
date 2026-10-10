"use client";

import { useContext } from "react";

import RadioFilterComponent from "../radio-filter/radio-filter.component";
import { FiltersContext } from "@/app/products/providers/filters/filters.provider";

export default function InventoryFilterComponent() {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const changeHandler = (value) => {
    dispatchFilters({ type: "updated_filter", key: "Inventory", value });
  };

  return (
    <RadioFilterComponent
      title="موجودی کالا"
      name="Inventory"
      options={[
        { value: "همه کالا ها", label: "همه کالا ها" },
        { value: "کالای موجود", label: "کالای موجود" },
      ]}
      value={filters.Inventory}
      onChange={changeHandler}
    />
  );
}
