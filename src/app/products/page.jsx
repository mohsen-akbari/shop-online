import LatestProducts from "./component/latest-product/Latest-Products.component";
import ProductsProvider from "./providers/products/products.provider";
import FiltersProvider from "./providers/filters/filters.provider";

export default function page({searchParams}) {
  const defaultFilters = generateDefaultFilters(searchParams);
  return (
    <FiltersProvider defaultFilters={defaultFilters}>
      <ProductsProvider>
        <LatestProducts />
      </ProductsProvider>
    </FiltersProvider>
  );
}

function generateDefaultFilters(searchParams) {
  const { query, brand, sort} = searchParams;

  return {
    query: normalizeFilter(query),
    brand: normalizeFilter(brand),
    sort: normalizeFilter(sortObj(sort)),
  };
}

function normalizeFilter(value) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function sortObj(x) {
  if (x) {
    let sort = { value: x, label: x };
    return sort;
  }
}
