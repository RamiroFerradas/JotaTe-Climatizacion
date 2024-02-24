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
      <Head>
        <meta property="og:title" content={selectedProduct?.name} />
        <meta
          property="og:description"
          content={selectedProduct?.description}
        />
        <meta property="og:image" content={selectedProduct?.image[0]} />
        <meta
          property="og:url"
          content={`https://www.jotateclimatizacion.com/productos/${selectedProduct?.id}`}
        />
        <meta property="og:type" content="product" />
      </Head>
      <ProductDetail
        selectedProduct={selectedProduct}
        recommendedProducts={recommendedProducts}
      />
    </>
  );
}
