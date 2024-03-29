"use server";
import { TABLE_PRODUCTS } from "@/app/constants";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function FilterProductsBySubcategories(subcategories: string) {
  const supabase = createServerComponentClient({ cookies });
  try {
    const { data: filteredProducts, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select()
      .in("subcategory", [subcategories])
      .eq("visible", "true");

    if (error) {
      throw error;
    }

    const productsWithParsedImages = filteredProducts.map((product) => ({
      ...product,
      image: formattedJsonToImagesArray(product.image || ("" as any)),
    }));

    return productsWithParsedImages;
  } catch (error) {
    console.error(
      "Error al filtrar productos por subcategorías:",
      error.message
    );
    return [];
  }
}
