"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Product } from "../models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "../constants";

export const updateProducts = async (
  existingProducts: Product[],
  productsToUpdate: Product[]
): Promise<Product[]> => {
  "use server";

  try {
    const supabase = createServerComponentClient({ cookies });
    // Indexar los productos existentes por su ID
    const existingProductsIndex = existingProducts.reduce((index, product) => {
      index[product.id] = product;
      return index;
    }, {});

    let updatedProducts: Product[] = []; // Inicializar el arreglo de productos actualizados

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

        const product = {
          price: selectedProduct.newPrice,
          category: selectedProduct.category,
          subcategory: selectedProduct.subcategory,
          destacado: selectedProduct.destacado,
          stock: selectedProduct.stock,
          description: selectedProduct.description,
          name: selectedProduct.name,
          image: selectedProduct.image,
          brand: selectedProduct.brand,
          id: selectedProduct.id,
        };

        const { data: updatedProduct, error: updateError } = await supabase
          .from(TABLE_PRODUCTS)
          .update(product)
          .eq("id", selectedProduct.id)
          .single();

        if (updateError) {
          throw new Error(
            `Error al actualizar el producto: ${updateError.message}`
          );
        }

        updatedProducts.push({ ...product, newPrice: 0 });
      }
    }

    console.log(`Total de productos actualizados: ${updatedProducts.length}`);
    revalidatePath("/admin");

    return updatedProducts;
  } catch (error) {
    console.error("Error al guardar:", error.message);
    throw error;
  }
};
