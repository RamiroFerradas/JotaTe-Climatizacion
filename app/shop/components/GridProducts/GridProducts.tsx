"use client";
import { products } from "@/api/producjs";
import { ProductCard } from "./ProductCard";
export type GridProductsProps = {};

const GridProducts: React.FC<GridProductsProps> = () => {
  return (
    <div className="flex justify-center min-h-[100vh] md:w-3/4 relative">
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-5 justify-center items-center">
        {products.map(({ item, name, price, description }, i) => (
          <ProductCard
            image={item}
            price={price}
            name={name}
            description={description}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default GridProducts;
