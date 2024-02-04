import { ProductCard } from "./ProductCard";
import CardSkeleton from "./ProductCard/CardSkeleton";
import { Paginate } from "../Paginate";
import { useState, useMemo, useEffect } from "react";
import { useProductList } from "@/app/hooks";

export type GridProductsProps = {
  // products: Product;
  // loading: boolean;
};

const GridProducts: React.FC<GridProductsProps> = () => {
  const { loading, products, searchPerformed, subCategoryActive } =
    useProductList();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const productsToShow = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage]);
  const totalPages = Math.ceil(products?.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [subCategoryActive]);

  return (
    <>
      <div className="flex flex-wrap gap-4 md:justify-start justify-center md:items-start py-5">
        {
          // loading
          // ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)
          // :
          productsToShow.length > 0
            ? productsToShow.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))
            : searchPerformed && (
                <div className="flex items-center justify-center h-48">
                  <p className="text-center text-gray-600 text-lg">
                    No hubo resultados para tu búsqueda.
                  </p>
                </div>
              )
        }
      </div>

      {!loading && (
        <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default GridProducts;
