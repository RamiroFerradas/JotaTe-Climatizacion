"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TABLE_CONSULTS } from "../../constants";

export const updateConsults = async (productId: string, consults: number) => {
  try {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.from(TABLE_CONSULTS).upsert([
      {
        productId,
        consults,
      },
    ]);
    if (error) {
      console.error("Error al actualizar la consulta:", error.message);
      revalidatePath("/admin");
    } else {
      console.log("Consulta actualizada con éxito");
    }
  } catch (error) {
    console.log(error.message);
  }
};
