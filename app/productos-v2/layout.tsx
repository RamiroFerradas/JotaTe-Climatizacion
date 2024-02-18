import { NextPage } from "next";
import { ReactNode, Suspense } from "react";
import { fetchProducts } from "../services/fetchs/fetchProducts";
import { Toaster } from "react-hot-toast";
import { Footer, Loading } from "../components";
import Appbar from "./components/Navbar/Navbar";
import GridProducts from "./components/GridProducts/GridProducts";
import { fetchBrands } from "../services/fetchs/fetchBrands";
import { getCategoriesWithSubcategories } from "../services/fetchs/getCategoriesWithSubcategories";
import { CartProvider } from "./context/CartContext";
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
      {children}
      <main className="min-h-screen flex justify-between flex-col">
        <GridProducts
          categoriesSubCategories={categoriesSubCategories}
          brands={brands}
          products={products}
        />

        <Footer />
      </main>
    </CartProvider>
  );
};
export default RootLayout;
