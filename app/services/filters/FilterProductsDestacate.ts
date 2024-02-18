"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { processImagesString } from "../../utilities/processImagesString";
import { TABLE_PRODUCTS } from "@/app/constants";

export async function FilterProductsDestacate() {
  try {
    const supabase = createServerComponentClient({ cookies });

    let { data: filteredProducts, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select("*")
      .filter("visible", "eq", true)
      .filter("destacado", "eq", true);

    if (error) {
      throw error;
    }

    const productsWithParsedImages = filteredProducts.map((product) => ({
      ...product,
      image: processImagesString(product.image || ""),
    }));

    return productsWithParsedImages;
  } catch (error) {
    console.error("Error al filtrar productos por marcas:", error.message);
    return [];
  }
}
