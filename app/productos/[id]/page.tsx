import { fetchProductById } from "@/app/services/fetchs/fetchProducts";
import ProductDetail from "./components/ProductDetail";
import { fetchRecommendedProductsByIds } from "@/app/services/fetchs/fetchRecommendedProductsByIds";
import { Seo } from "@/app/components";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const selectedProduct = await fetchProductById(params.id);
  const recommendedProductIds = selectedProduct?.recommended?.products;
  const recommendedProducts =
    recommendedProductIds &&
    (await fetchRecommendedProductsByIds(recommendedProductIds));
  console.log(recommendedProductIds);

  if (!selectedProduct) {
    return redirect("/productos");
  }
  return (
    <>
      <Seo
        id={selectedProduct?.id}
        description={selectedProduct?.name}
        img={selectedProduct?.image[0]}
        title={selectedProduct?.name}
      />
      <ProductDetail
        selectedProduct={selectedProduct}
        recommendedProducts={recommendedProducts}
      />
    </>
  );
}
