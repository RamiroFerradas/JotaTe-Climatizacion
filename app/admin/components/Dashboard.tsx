import ProductsTable from "./ProductsTable/ProductsTable";
import { fetchProducts } from "@/app/services/fetchs/fetchProducts";
import { getOptionsByProperty } from "@/app/utilities/getOptionsByPropertyProduct";
import { Suspense } from "react";
import LoadingAdmin from "./LoadingAdmin";

type Props = {};
async function Dashboard({}: Props) {
  const data = await fetchProducts({ filter: "all" });

  const optionsSubcategory = getOptionsByProperty(data, "subcategory");
  const optionsCategory = getOptionsByProperty(data, "category");
  const optionsBrands = getOptionsByProperty(data, "brand");

  return (
    <Suspense fallback={<LoadingAdmin />}>
      <ProductsTable
        optionsSubcategory={optionsSubcategory}
        optionsCategory={optionsCategory}
        optionsBrands={optionsBrands}
        products={data}
      />
    </Suspense>
  );
}
export default Dashboard;
