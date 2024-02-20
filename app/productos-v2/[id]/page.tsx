import { fetchProductById } from "@/app/services/fetchs/fetchProducts";
import ProductDetail from "./components/ProductDetail";
import { fetchRecommendedProductsByIds } from "@/app/services/fetchs/fetchRecommendedProductsByIds";

type Props = {
  params: any;
};
export default async function ProductPage({ params }: Props) {
  const selectedProduct = await fetchProductById(params.id);
  const recommendedProducts = await fetchRecommendedProductsByIds(
    selectedProduct.recommended
  );
  return (
    <ProductDetail
      selectedProduct={selectedProduct}
      recommendedProducts={recommendedProducts}
    />
  );
}
