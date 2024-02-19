import {
  fetchProductById,
  fetchProducts,
} from "@/app/services/fetchs/fetchProducts";
import ProductDetail from "./components/ProductDetail";
import { Suspense } from "react";
import { Loading } from "@/app/components";

type Props = {
  params: any;
};
export default async function ProductPage({ params }: Props) {
  const selectedProduct = await fetchProductById(params.id);
  const allProducts = await fetchProducts();

  return (
    <ProductDetail
      selectedProduct={selectedProduct}
      allProducts={allProducts}
    />
  );
}
