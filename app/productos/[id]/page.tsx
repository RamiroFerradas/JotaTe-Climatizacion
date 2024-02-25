import { fetchProductById } from "@/app/services/fetchs/fetchProducts";
import ProductDetail from "./components/ProductDetail";
import { fetchRecommendedProductsByIds } from "@/app/services/fetchs/fetchRecommendedProductsByIds";
import { Seo } from "@/app/components";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { Product } from "@/app/models";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
  product: Product;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  const product = await fetchProductById(id);

  const previousImages = (await parent).openGraph?.images || [];
  console.log(previousImages);
  return {
    title: product.name,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const product = await fetchProductById(params.id);
  const recommendedProductIds = product?.recommended?.products;
  console.log(product);

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
