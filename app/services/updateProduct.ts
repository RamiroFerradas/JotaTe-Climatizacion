import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Product } from "../models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "../constants";

export const updateProducts = async (
  existingProducts: Product[],
  productsToUpdate: Product[]
) => {
  "use server";

  try {
    const supabase = createServerComponentClient({ cookies });

    // Indexar los productos existentes por su ID
    const existingProductsIndex = existingProducts.reduce((index, product) => {
      index[product.id] = product;
      return index;
    }, {});

    let updatedProductsCount = 0; // Inicializar el contador

    for (const selectedProduct of productsToUpdate) {
      // Obtener el producto correspondiente del índice
      const existingProduct = existingProductsIndex[selectedProduct.id];

      if (!existingProduct) {
        console.error(
          `Error: No se pudo encontrar el producto existente con ID: ${selectedProduct.id}`
        );
        continue;
      }

      const hasChanges = Object.keys(selectedProduct).some(
        (key) => selectedProduct[key] !== existingProduct[key]
      );

      if (hasChanges) {
        // Solo actualiza si hay cambios
        const { error: updateError } = await supabase
          .from(TABLE_PRODUCTS)
          .update({
            price: selectedProduct.price,
            category: selectedProduct.category,
            subcategory: selectedProduct.subcategory,
            destacado: selectedProduct.destacado,
          })
          .eq("id", selectedProduct.id);

        if (updateError) {
          throw new Error(
            `Error al actualizar el producto: ${updateError.message}`
          );
        }

        updatedProductsCount++;
      }
    }

    console.log(`Total de productos actualizados: ${updatedProductsCount}`);
    setTimeout(() => {
      revalidatePath("/admin");
    }, 300);
  } catch (error) {
    console.error("Error al guardar:", error.message);
    throw error;
  }
};
