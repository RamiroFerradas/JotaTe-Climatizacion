"use server";

import { TABLE_PRODUCTS } from "@/app/constants";
import { SortOrderOptions } from "@/app/models/SortOrderOption";
import { processImagesString } from "@/app/utilities/processImagesString";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Product } from "@/app/models";

export async function FilterProductsBySubcategories(subcategories: string) {
  try {
    const supabase = createServerComponentClient({ cookies });

    const { data: filteredProducts, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select("*")
      .filter("visible", "eq", true)
      .in("subcategory", [subcategories]);

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
