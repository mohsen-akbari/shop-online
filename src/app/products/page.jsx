import LatestProducts from "./component/latest-product/Latest-Products.component";
import FiltersProvider from "./providers/filters/filters.provider";
import ProductsProvider from "./providers/products/products.provider";

export default async function page({ searchParams }) {
  // const defaultFilters = generateDefaultFilters(searchParams);
  const params = await searchParams;
  const defaultFilters = generateDefaultFilters(params);
  return (
    <FiltersProvider defaultFilters={defaultFilters}>
      {/* <ProductsProvider> */}
        <LatestProducts />
      {/* </ProductsProvider> */}
    </FiltersProvider>
  );
}

// function generateDefaultFilters(searchParams) {
//   const { query, brand, sort } = searchParams;

//   return {
//     query: normalizeFilter(query),
//     brand: normalizeFilter(brand),
//     sort: normalizeFilter(sortObj(sort)),
//   };
// }

function generateDefaultFilters(searchParams) {
  const { query, brand, sort } = searchParams;

  return {
    ...(query && { query: normalizeFilter(query) }),
    ...(brand && { brand: normalizeFilter(brand) }),
    sort: sortObj(normalizeFilter(sort)) ?? {
      value: "بهترین",
      label: "بهترین",
    },
  };
}

function normalizeFilter(value) {
  return Array.isArray(value) ? value[0] : value;
}

function sortObj(value) {
  if (value) {
    return { value, label: value };
  }

  return undefined;
}
