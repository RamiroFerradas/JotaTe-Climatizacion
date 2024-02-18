"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Product } from "../../models";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "../../constants";
import { revalidatePath } from "next/cache";

export async function addProduct(newProduct: Product): Promise<Product> {
  try {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
      .from(TABLE_PRODUCTS)
      .insert([newProduct]);

    if (error) {
      throw new Error(
        `Error al agregar el producto a Supabase: ${error.message}`
      );
    }

    revalidatePath("/admin");
    return data ? (data as Product)[0] : [];
  } catch (error) {
    console.error("Error al agregar el producto: " + error.message);
  }
}
