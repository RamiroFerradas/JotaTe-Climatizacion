"use server";
import { TABLE_PRODUCTS } from "@/app/constants";
import { processImagesString } from "@/app/utilities/processImagesString";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const supabase = createServerComponentClient({ cookies });

export async function FilterProductsBySubcategories(subcategories: string) {
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
      image: processImagesString(product.image || ("" as any)),
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
