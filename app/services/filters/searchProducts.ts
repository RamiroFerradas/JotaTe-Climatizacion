"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { TABLE_PRODUCTS } from "@/app/constants";
import { processImagesString } from "@/app/utilities/processImagesString";

const supabase = createServerComponentClient({ cookies });

export async function searchProducts(query: string) {
  try {
    let queryBuilder = supabase
      .from(TABLE_PRODUCTS)
      .select("*")
      .filter("visible", "eq", true);

    if (query.trim() !== "") {
      queryBuilder = queryBuilder.ilike("name", `%${query}%`);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      throw error;
    }

    const productsWithParsedImages = data.map((product) => ({
      ...product,
      image: processImagesString(product.image || ""),
    }));

    return productsWithParsedImages;
  } catch (error) {
    console.error("Error al buscar productos en Supabase:", error.message);
    return [];
  }
}
