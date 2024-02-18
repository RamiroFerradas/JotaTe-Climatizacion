"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "../../constants";

export async function fetchBrands() {
  try {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
      .from(TABLE_PRODUCTS) // Reemplaza 'products' con el nombre de tu tabla
      .select("brand");

    if (error) {
      throw error;
    }

    const marcasUnicasSet = new Set(data.map((row) => row.brand));

    const marcasUnicas = Array.from(marcasUnicasSet).map((brand) => ({
      label: brand,
    }));

    return marcasUnicas;
  } catch (error) {
    console.error("Error al obtener las marcas únicas:", error.message);
    // Puedes manejar el error de otra manera según tus necesidades
    return [];
  }
}
