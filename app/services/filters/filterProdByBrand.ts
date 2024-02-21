"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "@/app/constants";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";

export async function FilterProductsByBrand(uniqueBrands: string[]) {
  try {
    const supabase = createServerComponentClient({ cookies });

    let { data: filteredProducts, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select("*")
      .eq("visible", "true");

    if (uniqueBrands.length > 0) {
      ({ data: filteredProducts, error } = await supabase
        .from(TABLE_PRODUCTS)
        .select()
        .eq("visible", "true")
        .in("brand", uniqueBrands));
    }

    if (error) {
      throw error;
    }

    const productsWithParsedImages = filteredProducts.map((product) => ({
      ...product,
      image: formattedJsonToImagesArray(product.image || ""),
    }));

    return productsWithParsedImages;
  } catch (error) {
    console.error("Error al filtrar productos por marcas:", error.message);
    return [];
  }
}
