import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ProductsTable from "./ProductsTable/ProductsTable";
import { Product } from "@/app/models";
import { fetchProducts } from "@/app/services/fetchProducts";
import { getOptionsByProperty } from "@/app/utilities/getOptionsByPropertyProduct";
import { updateProducts } from "@/app/services/updateProduct";

type Props = {};
async function Dashboard({}: Props) {
  const data = await fetchProducts();

  const optionsSubcategory = getOptionsByProperty(data, "subcategory");
  const optionsCategory = getOptionsByProperty(data, "category");
  const optionsBrands = getOptionsByProperty(data, "brand");

  const sortedOptionsBrands = optionsBrands
    .slice() // Crear una copia del array para no modificar el original
    .sort((a, b) => a.label.localeCompare(b.label));

  const optionsBrandsWithAll = [
    { label: "Todas", key: "Todas" },
    ...sortedOptionsBrands,
  ];

  return (
    <div>
      <div className="flex flex-col gap-3 px-4 relative">
        <ProductsTable
          optionsSubcategory={optionsSubcategory}
          optionsCategory={optionsCategory}
          optionsBrands={optionsBrandsWithAll}
          products={data}
          handleUpdateProducts={updateProducts}
        />
      </div>
    </div>
  );
}
export default Dashboard;
