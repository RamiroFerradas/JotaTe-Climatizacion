"use client";

import { ProductCard } from "./ProductCard";
import useProductList from "@/app/hooks/useProductList";
import CardSkeleton from "./ProductCard/CardSkeleton";
export type GridProductsProps = {};

const GridProducts: React.FC<GridProductsProps> = () => {
  const { loading, products } = useProductList();

  return (
    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 p-5 justify-center items-star h-[90vh] overflow-y-auto scrollbar-custom md:w-3/4 relative z-40">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        : products.map((prod) => <ProductCard key={prod.id} product={prod} />)}
    </div>
  );
};

export default GridProducts;
