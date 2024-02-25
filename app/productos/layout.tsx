import { NextPage } from "next";
import { ReactNode, Suspense } from "react";
import { fetchProducts } from "../services/fetchs/fetchProducts";
import { Toaster } from "react-hot-toast";
import GridProducts from "./components/GridProducts/GridProducts";
import { fetchBrands } from "../services/fetchs/fetchBrands";
import { getCategoriesWithSubcategories } from "../services/fetchs/getCategoriesWithSubcategories";
import { CartProvider } from "./context/CartContext";
import FooterJT from "../components/FooterJT";
export const revalidate = 0;
export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = async ({ children }) => {
  const products = await fetchProducts();
  const brands = await fetchBrands();
  const categoriesSubCategories = await getCategoriesWithSubcategories();

  return (
    <CartProvider>
      <Toaster position="top-right" />
      <main className="min-h-screen flex justify-between flex-col">
        {children}
        <GridProducts
          categoriesSubCategories={categoriesSubCategories}
          brands={brands}
          products={products}
        />
        <FooterJT />
      </main>
    </CartProvider>
  );
};
export default RootLayout;
