"use server";
import { fetchProductById } from "@/app/services/fetchs/fetchProducts";
import ProductDetail from "./components/ProductDetail";
import { fetchRecommendedProductsByIds } from "@/app/services/fetchs/fetchRecommendedProductsByIds";
import { Suspense } from "react";
import Loading from "./loading";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const selectedProduct = await fetchProductById(params.id);
  const recommendedProducts = await fetchRecommendedProductsByIds(
    selectedProduct.recommended
  );
  return (
    <Suspense key={selectedProduct.id} fallback={<Loading />}>
      <ProductDetail
        selectedProduct={selectedProduct}
        recommendedProducts={recommendedProducts}
      />
    </Suspense>
  );
}
