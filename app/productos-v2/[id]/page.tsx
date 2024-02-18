import { fetchProductById } from "@/app/services/fetchs/fetchProducts";
import ProductDetail from "./components/ProductDetail";
import { Suspense } from "react";
import { Loading } from "@/app/components";

type Props = {
  params: any;
};
export default async function ProductPage({ params }: Props) {
  const selectedProduct = await fetchProductById(params.id);
  return <ProductDetail selectedProduct={selectedProduct} />;
}
