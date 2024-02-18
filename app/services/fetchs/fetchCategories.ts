"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "../../constants";

export async function fetchCategories() {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select("category");

    if (error) {
      throw error;
    }

    const marcasUnicasSet = new Set(data.map((row) => row.category));
    const marcasUnicas = Array.from(marcasUnicasSet);

    return marcasUnicas;
  } catch (error) {
    console.error("Error al obtener las categorias únicas:", error.message);
    // Puedes manejar el error de otra manera según tus necesidades
    return [];
  }
}
