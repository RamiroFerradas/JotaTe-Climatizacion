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
  const { loading, products } = useProductList();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const productsToShow = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products?.length / productsPerPage);
  const router = useRouter();

  return (
    <>
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 p-5 justify-center items-star ">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
          : productsToShow.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
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
