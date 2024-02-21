"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "@/app/constants";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";

export async function filterOptionalTextProducts(
  optionalText: string[],
  operator: "eq" | "in" = "in"
) {
  try {
    const supabase = createServerComponentClient({ cookies });

    let query = supabase.from(TABLE_PRODUCTS).select().eq("visible", "true");

    if (operator === "eq") {
      query = query.eq("name", optionalText[0]); // Puedes ajustar esto según tus necesidades
    } else if (operator === "in") {
      query = query.in("name", optionalText);
    } else {
      throw new Error("Operador no válido. Debe ser 'eq' o 'in'.");
    }

    const { data: filteredProducts, error } = await query;

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
