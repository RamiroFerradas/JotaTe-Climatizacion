import ProductsTable from "./ProductsTable/ProductsTable";
import { fetchProducts } from "@/app/services/fetchProducts";
import { getOptionsByProperty } from "@/app/utilities/getOptionsByPropertyProduct";
import { updateProducts } from "@/app/services/updateProduct";

type Props = {};
async function Dashboard({}: Props) {
  const data = await fetchProducts();

  const optionsSubcategory = getOptionsByProperty(data, "subcategory");
  const optionsCategory = getOptionsByProperty(data, "category");
  const optionsBrands = getOptionsByProperty(data, "brand");

  return (
    <ProductsTable
      optionsSubcategory={optionsSubcategory}
      optionsCategory={optionsCategory}
      optionsBrands={optionsBrands}
      products={data}
      handleUpdateProducts={updateProducts}
    />
  );
}
export default Dashboard;
