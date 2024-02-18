import { NextPage } from "next";
import { ReactNode, Suspense } from "react";
import { fetchProducts } from "../services/fetchs/fetchProducts";
import { Toaster } from "react-hot-toast";
import { Footer, Loading } from "../components";
import Appbar from "./components/Navbar/Navbar";
import GridProducts from "./components/GridProducts/GridProducts";
import { fetchBrands } from "../services/fetchs/fetchBrands";
import { getCategoriesWithSubcategories } from "../services/fetchs/getCategoriesWithSubcategories";
export const revalidate = 0;
export type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = async ({ children }) => {
  const products = await fetchProducts();
  const brands = await fetchBrands();
  const categoriesSubCategories = await getCategoriesWithSubcategories();

  return (
    <main
      className="
    "
    >
      <Toaster position="top-right" />
      {children}

      {/* <CategoriesNavV2 products={products} /> */}

      {/* <div className="flex justify-center items-start relative"> */}
      {/* <div className="md:w-1/4 absolute md:sticky md:top-0 left-0 w-full max-w-[80rem] h-full md:minh-[80vh] overflow-y-auto p-4 custom-scrollbar">
              <Sidebar

              // setopenSidebar={setopenSidebar}
              // openSidebar={openSidebar}
              />
            </div> */}
      {/* <div className="md:w-3/4"> */}
      <Suspense fallback={<Loading />}>
        <GridProducts
          categoriesSubCategories={categoriesSubCategories}
          brands={brands}
          products={products}
        />
      </Suspense>
      {/* </div> */}
      {/* </div> */}
      <Footer />
    </main>
  );
};
export default RootLayout;
