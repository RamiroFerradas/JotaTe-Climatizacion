"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "@/app/constants";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";

export async function fetchRecommendedProductsByIds(recommendedIds: string[]) {
  const supabase = createServerComponentClient({ cookies });
  try {
    // Obtener los productos recomendados por sus IDs
    let { data: recommendedProducts, error: recommendedProductsError } =
      await supabase
        .from(TABLE_PRODUCTS)
        .select("*")
        .filter("visible", "eq", true)
        .in("id", recommendedIds);

    if (recommendedProductsError) {
      throw recommendedProductsError;
    }

    // Parsear las imágenes de los productos recomendados
    const productsWithParsedImages = recommendedProducts.map((product) => ({
      ...product,
      image: formattedJsonToImagesArray(product.image || ""),
    }));

    return productsWithParsedImages;
  } catch (error) {
    console.error("Error al obtener productos recomendados:", error.message);
    return [];
  }
}
