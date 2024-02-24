import {
  fetchProductById,
  fetchProducts,
} from "@/app/services/fetchs/fetchProducts";
import ProductDetail from "./components/ProductDetail";
import { fetchRecommendedProductsByIds } from "@/app/services/fetchs/fetchRecommendedProductsByIds";
import { Suspense } from "react";
import LoadingProducts from "../loading";
import { Card, Drawer } from "@mui/material";
import LoadingProduct from "./loading";
import Head from "next/head";
import { Seo } from "@/app/components";
import { title } from "process";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const selectedProduct = await fetchProductById(params.id);
  const recommendedProductIds = selectedProduct.recommended?.products;
  const recommendedProducts =
    recommendedProductIds &&
    (await fetchRecommendedProductsByIds(recommendedProductIds));

  return (
    <>
      <Seo
        id={selectedProduct.id}
        description={selectedProduct.name}
        img={selectedProduct.image[0]}
        title={selectedProduct.name}
      />
      <ProductDetail
        selectedProduct={selectedProduct}
        recommendedProducts={recommendedProducts}
      />
    </>
  );
}
