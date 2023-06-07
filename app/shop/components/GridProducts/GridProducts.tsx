"use client";

import { ProductCard } from "./ProductCard";
import useProductList from "@/app/hooks/useProductList";
import CardSkeleton from "./ProductCard/CardSkeleton";
import { Pagination, Stack } from "@mui/material";
export type GridProductsProps = {};

const GridProducts: React.FC<GridProductsProps> = () => {
  const { loading, products } = useProductList();

  return (
    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 p-5 justify-center items-star ">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
        : products.map((prod) => <ProductCard key={prod.id} product={prod} />)}
      {/* <Stack spacing={2}>
        <Pagination count={11} defaultPage={6} siblingCount={0} />
        <Pagination count={11} defaultPage={6} /> 
        <Pagination
          count={11}
          defaultPage={6}
          siblingCount={0}
          boundaryCount={2}
        />
        <Pagination count={11} defaultPage={6} boundaryCount={2} />
      </Stack> */}
    </div>
  );
};

export default GridProducts;
