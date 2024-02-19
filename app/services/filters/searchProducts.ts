"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { TABLE_PRODUCTS } from "@/app/constants";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";

const supabase = createServerComponentClient({ cookies });

export async function searchProducts(query: string) {
  try {
    let queryBuilder = supabase
      .from(TABLE_PRODUCTS)
      .select("*")
      .eq("visible", "true");

    let searchByName = true;

    if (query.trim() !== "") {
      queryBuilder = queryBuilder.ilike("name", `%${query}%`);
    } else {
      // Si el query está vacío, no buscar por nombre
      searchByName = false;
    }

    const { data, error } = await queryBuilder;

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      // Si no encontró resultados por nombre y no se buscó por nombre, intenta buscar por ID
      const { data: productsById, error: errorById } = await supabase
        .from(TABLE_PRODUCTS)
        .select("*")
        .eq("id", query);

      if (errorById) {
        throw errorById;
      }

      const productsWithParsedImages = productsById.map((product) => ({
        ...product,
        image: formattedJsonToImagesArray(product.image || ""),
      }));

      return productsWithParsedImages;
    }

    const productsWithParsedImages = data.map((product) => ({
      ...product,
      image: formattedJsonToImagesArray(product.image || ""),
    }));

    return productsWithParsedImages;
  } catch (error) {
    console.error("Error al buscar productos en Supabase:", error.message);
    return [];
  }
}
