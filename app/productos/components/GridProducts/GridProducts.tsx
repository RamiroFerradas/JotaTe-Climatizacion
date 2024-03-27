"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { Product } from "@/app/models";
import Paginate from "../Paginate";
import Sidebar from "../SIdebar/Sidebar";
import ProductCard from "./ProductCard/ProductCard";
import CategoriesNavV2 from "../CategoriesNav";
import Navbar from "../Navbar/Navbar";
import CardSkeleton from "./ProductCard/CardSkeleton";
import Link from "next/link";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { handleScrollToTop } from "@/app/utilities/handleScrollTop";
import { useScreenSize, usePaymentStatus } from "@/app/hooks";
import ModalPaymentApproved from "./ModalPaymentApproved";

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
  const [categoryActive, setCategoryActive] = useState<string>("Todos");
  const [subCategoryActive, setSubCategoryActive] = useState<string>("");
  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);
  const [brandsFiltered, setBrandsFiltered] = useState<string[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadProducts, setLoadProducts] = useState(false);
  const productsPerPage = 10;
  const { openModalPayment, setOpenModalPayment } = usePaymentStatus();

  const productsToShow = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return productsFiltered?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [productsFiltered, currentPage]);

  const totalPages = Math.ceil(productsFiltered?.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [subCategoryActive]);

  return (
    <>
      <Navbar
        setProductsFiltered={setProductsFiltered}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        products={products}
      />

      <CategoriesNavV2
        setCategoryActive={setCategoryActive}
        categoryActive={categoryActive}
        categoriesSubCategories={categoriesSubCategories}
        setSubCategoryActive={setSubCategoryActive}
        setProductsFiltered={setProductsFiltered}
        allProducts={products}
        setLoadProducts={setLoadProducts}
        brandsFiltered={brandsFiltered}
        setBrandsFiltered={setBrandsFiltered}
      />

      <div className="flex justify-center items-start relative">
        <div className="md:w-1/4 absolute md:sticky md:top-0 left-0 w-full max-w-[80rem] h-full md:max-h-[100vh] overflow-y-auto p-4 custom-scrollbar">
          <Sidebar
            productsFiltered={productsFiltered}
            setProductsFiltered={setProductsFiltered}
            setopenSidebar={setOpenSidebar}
            openSidebar={openSidebar}
            brands={brands}
            setLoadProducts={setLoadProducts}
            subCategoryActive={subCategoryActive}
            categoryActive={categoryActive}
            brandsFiltered={brandsFiltered}
            setBrandsFiltered={setBrandsFiltered}
          />
        </div>

        <div className="md:w-3/4 relative w-full">
          <div className="flex flex-wrap gap-4 md:justify-start justify-center md:items-start py-5">
            {loadProducts
              ? Array.from({ length: 5 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))
              : productsToShow.map((prod: Product) => (
                  <Suspense key={prod.id} fallback={<CardSkeleton />}>
                    <Link
                      shallow
                      scroll={false}
                      href={`/productos/${prod.id}`}
                      key={prod.id}
                    >
                      <ProductCard product={prod} />
                    </Link>
                  </Suspense>
                ))}
          </div>
          {!productsFiltered.length && (
            <div className="flex items-center justify-center h-48">
              <p className="text-center text-gray-600 text-lg">
                No hubo resultados para tu búsqueda.
              </p>
            </div>
          )}

          {!loadProducts && (
            <Paginate
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <div className="md:hidden w-10 h-10 flex justify-center items-center sticky bottom-3 left-96 right-0 rounded-full bg-[#006d54] border border-[#006d54] shadow-2xl mr-2 mb-2 overflow-hidden z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenSidebar(!openSidebar);
                handleScrollToTop();
              }}
              className="rounded  overflow-hidden md:hidden flex items-center justify-center text-white"
              color="green"
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {openModalPayment && (
        <ModalPaymentApproved
          openModal={openModalPayment}
          setOpenModal={setOpenModalPayment}
        />
      )}
    </>
  );
}
