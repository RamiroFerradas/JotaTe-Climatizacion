import { fetchProductById } from "@/app/services/fetchs/fetchProducts";
import ProductDetail from "./components/ProductDetail";
import { fetchRecommendedProductsByIds } from "@/app/services/fetchs/fetchRecommendedProductsByIds";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const product = await fetchProductById(id);

  return {
    title: product.name,
    description: `$${product.price}`,
    openGraph: {
      images: product.image[0],
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_API_URL}/productos/${id}`),
  };
}

export default async function Page({ params }: Props) {
  const product = await fetchProductById(params.id);
  const recommendedProductIds = product?.recommended?.products;

  if (!product) {
    return redirect("/productos");
  }
  const recommendedProducts =
    recommendedProductIds &&
    (await fetchRecommendedProductsByIds(recommendedProductIds));

  return (
    <>
      <ProductDetail
        selectedProduct={product}
        recommendedProducts={recommendedProducts}
      />
    </>
  );
}
