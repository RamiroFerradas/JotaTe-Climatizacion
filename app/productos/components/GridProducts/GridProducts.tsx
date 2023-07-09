import { ProductCard } from "./ProductCard";
import CardSkeleton from "./ProductCard/CardSkeleton";
import { Paginate } from "../Paginate";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/models";
import { useProductList } from "@/app/hooks";

export type GridProductsProps = {
  // products: Product;
  // loading: boolean;
};

const GridProducts: React.FC<GridProductsProps> = () => {
  const { loading, products, searchPerformed } = useProductList();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const productsToShow = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products?.length / productsPerPage);
  const router = useRouter();
  return (
    <>
      {loading ? (
        <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid-cols-2 p-5 justify-center items-start">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : productsToShow.length > 0 ? (
        <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid-cols-2 p-5 justify-center items-start">
          {productsToShow.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        searchPerformed && (
          <div className="flex items-center justify-center h-48">
            <p className="text-center text-gray-600 text-lg">
              No hubo resultados para tu búsqueda.
            </p>
          </div>
        )
      )}

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
