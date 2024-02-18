"use server";

import { TABLE_PRODUCTS } from "@/app/constants";
import { SortOrderOptions } from "@/app/models/SortOrderOption";
import { processImagesString } from "@/app/utilities/processImagesString";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Product } from "@/app/models";

export async function FetchAndSortProducts(
  sortBy: string,
  sortOrder: SortOrderOptions = SortOrderOptions.Ascending,
  filteredProducts?: Product[]
) {
  try {
    const supabase = createServerComponentClient({ cookies });

    let productsToSort: Product[] = [];

    if (filteredProducts.length) {
      productsToSort = filteredProducts;
    } else {
      const { data, error } = await supabase
        .from(TABLE_PRODUCTS)
        .select("*")
        .eq("visible", "true");

      if (error) {
        throw error;
      }

      productsToSort = data || [];
    }

    const sortedProducts = [...productsToSort].sort((a, b) => {
      return sortOrder === SortOrderOptions.Descending
        ? (a[sortBy] as number) - (b[sortBy] as number)
        : (b[sortBy] as number) - (a[sortBy] as number);
    });

    const productsWithParsedImages = sortedProducts.map((product) => ({
      ...product,
      image: processImagesString(product.image || ("" as any)),
    }));

    return productsWithParsedImages;
  } catch (error) {
    console.error("Error al obtener y ordenar productos:", error.message);
    return [];
  }
}
