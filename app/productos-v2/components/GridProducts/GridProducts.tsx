"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useProductList } from "@/app/hooks";
import { Product } from "@/app/models";
import Paginate from "../Paginate";
import Sidebar from "../SIdebar/Sidebar";
import { usePathname } from "next/navigation";
import ProductCard from "./ProductCard/ProductCard";
import CategoriesNavV2 from "../CategoriesNavV2";
import Navbar from "../Navbar/Navbar";
import CardSkeleton from "./ProductCard/CardSkeleton";

type Props = {
  products: Product[];
  brands: { label: string }[];
  categoriesSubCategories: { category: string; options: string[] }[];
};
export default function GridProducts({
  products,
  brands,
  categoriesSubCategories,
}: Props) {
  const { searchPerformed } = useProductList();
  const [categoryActive, setCategoryActive] = useState<string>("Todos");
  const [subCategoryActive, setSubCategoryActive] = useState<string>("");
  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);
  const [openSidebar, setopenSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const productsToShow = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return productsFiltered?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [productsFiltered, currentPage]);
  const totalPages = Math.ceil(productsFiltered?.length / productsPerPage);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(1);
  }, [subCategoryActive]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     sessionStorage.setItem("scrollPosition", String(scrollPosition));
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   const savedScrollPosition = sessionStorage.getItem("scrollPosition");
  //   if (savedScrollPosition) {
  //     window.scrollTo(0, parseInt(savedScrollPosition, 10));
  //   }

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [pathname]);

  return (
    <main>
      <Navbar
        setProductsFiltered={setProductsFiltered}
        openSidebar={openSidebar}
        setOpenSidebar={setopenSidebar}
      />

      <CategoriesNavV2
        setCategoryActive={setCategoryActive}
        categoryActive={categoryActive}
        categoriesSubCategories={categoriesSubCategories}
        setSubCategoryActive={setSubCategoryActive}
        setProductsFiltered={setProductsFiltered}
        allProducts={products}
      />

      <div className="flex justify-center items-start relative">
        <div className="md:w-1/4 absolute md:sticky md:top-0 left-0 w-full max-w-[80rem] h-full md:minh-[80vh] overflow-y-auto p-4 custom-scrollbar">
          <Sidebar
            productsFiltered={productsFiltered}
            setProductsFiltered={setProductsFiltered}
            setopenSidebar={setopenSidebar}
            openSidebar={openSidebar}
            brands={brands}
          />
        </div>
        <div className="md:w-3/4">
          <div className="flex flex-wrap gap-4 md:justify-start justify-center md:items-start py-5">
            {productsToShow.length > 0
              ? productsToShow.map((prod) => (
                  <Suspense key={prod.id} fallback={<CardSkeleton />}>
                    <ProductCard product={prod} />
                  </Suspense>
                ))
              : searchPerformed && (
                  <div className="flex items-center justify-center h-48">
                    <p className="text-center text-gray-600 text-lg">
                      No hubo resultados para tu búsqueda.
                    </p>
                  </div>
                )}
          </div>

          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}