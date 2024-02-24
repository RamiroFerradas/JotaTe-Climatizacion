import { NextPage } from "next";
import { ReactNode, Suspense } from "react";
import { fetchProducts } from "../services/fetchs/fetchProducts";
import { Toaster } from "react-hot-toast";
import { Footer, Loading } from "../components";
import GridProducts from "./components/GridProducts/GridProducts";
import { fetchBrands } from "../services/fetchs/fetchBrands";
import { getCategoriesWithSubcategories } from "../services/fetchs/getCategoriesWithSubcategories";
import { CartProvider } from "./context/CartContext";
import LoadingProducts from "./loading";
export const revalidate = 0;
export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = async ({ children }) => {
const products = await fetchProducts();
const first30Products = products.slice(0, 30);
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
        products={first30Products}
      />

      <Footer />
    </main>
  </CartProvider>
);
};
export default RootLayout;
