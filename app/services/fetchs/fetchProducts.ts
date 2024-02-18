"use server";

import { Product } from "../../models";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { processImagesString } from "../../utilities/processImagesString";
import { TABLE_PRODUCTS } from "../../constants";
interface FetchProductsOptions {
  filter?: string;
}

export async function fetchProducts(
  options: FetchProductsOptions = {}
): Promise<Product[]> {
  try {
    const { filter = "visible" } = options;
    const supabase = createServerComponentClient({ cookies });

    const query =
      filter === "all"
        ? supabase.from(TABLE_PRODUCTS).select("*")
        : supabase.from(TABLE_PRODUCTS).select("*").filter(filter, "eq", true);

    const { data, error } = await query; // <-- Corregir aquí

    if (error) {
      throw new Error(`Error al obtener datos de Supabase: ${error.message}`);
    }

    const productsWithParsedImages = data.map((product) => ({
      ...product,
      image: processImagesString(product.image || ""),
    }));

    return productsWithParsedImages as Product[];
  } catch (error) {
    throw new Error(`Error al obtener los productos: ${error.message}`);
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const supabase = createServerComponentClient({ cookies });
    // const { id } = params;
    const { data, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select("*")
      .eq("id", id);
    const productsWithParsedImages = data.map((product) => ({
      ...product,
      image: processImagesString(product.image || ""),
    }));

    if (error) {
      throw new Error(
        `Error al obtener el producto con ID ${id}: ${error.message}`
      );
    }
    // const data = await response.json();

    return productsWithParsedImages[0] as Product;
  } catch (error) {
    throw new Error(
      `Error al obtener el producto con ID ${id}: ` + error.message
    );
  }
}
// const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
// const AUTH_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `${AUTH_TOKEN}`,
// };

// if (!API_URL) {
//   throw new Error("API_URL is not defined");
// }

// export async function fetchProducts(): Promise<Product[]> {
//   try {
//     // Obtener los datos de Supabase
//     const { data } = createRouteHandlerClient({ cookies });
//     console.log(data);
//     if (error) {
//       throw new Error(`Error al obtener datos de Supabase: ${error.message}`);
//     }

//     // Procesar las imágenes para convertirlas en arrays de strings
//     const productsWithParsedImages = data.map((product) => ({
//       ...product,
//       image: processImagesString(product.image || ""),
//     }));

//     return productsWithParsedImages;
//   } catch (error) {
//     console.error(`Error al obtener productos: ${error.message}`);
//     throw new Error(`Error al obtener productos: ${error.message}`);
//   }
// }
