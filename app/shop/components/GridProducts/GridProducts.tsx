"use client";

import { ProductCard } from "./ProductCard";
import useProductList from "@/app/hooks/useProductList";
import CardSkeleton from "./ProductCard/CardSkeleton";
import { useEffect } from "react";
export type GridProductsProps = {};

const GridProducts: React.FC<GridProductsProps> = () => {
  const { loading, products } = useProductList();

  return (
    <div className="flex justify-center min-h-[100vh] md:w-3/4 relative">
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-5 justify-center items-star h-[90vh] overflow-y-auto custom-scrollbar">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : products.map((prod) => (
              <ProductCard
                image={prod.image}
                price={prod.price}
                name={prod.name}
                description={prod.description}
                id={prod.id}
                brand={prod.brand}
                category={prod.category}
                stock={prod.stock}
              />
            ))}
      </div>
    </div>
  );
};

export default GridProducts;
