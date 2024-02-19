"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Product } from "../../models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { TABLE_PRODUCTS } from "../../constants";
import { formattedImagesArrayToJson } from "../../utilities/formattedImagesArrayToJson";

const supabase = createServerComponentClient({ cookies });
export const updateProductsV2 = async (updateProducts: Product[]) => {
  try {
    const updatedProducts: Product[] = [];

    for (const product of updateProducts) {
      const updatedProduct = await updateProduct(product);
      updatedProducts.push({ ...updatedProduct, newPrice: 0 });
    }

    console.log(`Total de productos actualizados: ${updatedProducts.length}`);
    return updatedProducts;
  } catch (error) {
    console.log(error.message);
  }
};

const updateProduct = async (product: Product) => {
  try {
    const updatedProduct = {
      price:
        product.newPrice === 0
          ? product.price
          : product.newPrice || product.price,
      category: product.category,
      subcategory: product.subcategory,
      destacado: product.destacado,
      stock: product.stock,
      description: product.description,
      name: product.name,
      image: formattedImagesArrayToJson(product.image) as any,
      brand: product.brand,
      id: product.id,
      visible: product.visible,
      consults: product.consults,
    };

    const { data, error } = await supabase
      .from(TABLE_PRODUCTS)
      .update(updatedProduct)
      .eq("id", product.id)
      .single();

    if (error) {
      console.error("Error al actualizar el producto:", error.message);
    } else {
      console.log("Producto actualizado con éxito:", product.name);
    }

    revalidatePath("/admin");

    return updatedProduct;
  } catch (error) {
    console.log(error.message);
  }
};

// export const updateProducts = async (
//   existingProducts: Product[],
//   productsToUpdate: Product[]
// ): Promise<Product[]> => {
//   "use server";

//   try {
//     const supabase = createServerComponentClient({ cookies });
//     // Indexar los productos existentes por su ID
//     const existingProductsIndex = existingProducts.reduce((index, product) => {
//       index[product.id] = product;
//       return index;
//     }, {});

//     console.log(existingProductsIndex);

//     let updatedProducts: Product[] = []; // Inicializar el arreglo de productos actualizados

//     for (const selectedProduct of productsToUpdate) {
//       // Obtener el producto correspondiente del índice
//       const existingProduct = existingProductsIndex[selectedProduct.id];

//       if (!existingProduct) {
//         console.error(
//           `Error: No se pudo encontrar el producto existente con ID: ${selectedProduct.id}`
//         );
//         continue;
//       }

//       const hasChanges = Object.keys(selectedProduct).some(
//         (key) => selectedProduct[key] !== existingProduct[key]
//       );

//       if (hasChanges) {
//         // Solo actualiza si hay cambios
//         const product = {
//           price: selectedProduct.newPrice,
//           category: selectedProduct.category,
//           subcategory: selectedProduct.subcategory,
//           destacado: selectedProduct.destacado,
//           stock: selectedProduct.stock,
//           description: selectedProduct.description,
//           name: selectedProduct.name,
//           image: formattedImagesArrayToJson(selectedProduct.image) as any,
//           brand: selectedProduct.brand,
//           id: selectedProduct.id,
//         };

//         const { data: updatedProduct, error: updateError } = await supabase
//           .from(TABLE_PRODUCTS)
//           .update(product)
//           .eq("id", selectedProduct.id)
//           .single();

//         if (updateError) {
//           throw new Error(
//             `Error al actualizar el producto: ${updateError.message}`
//           );
//         }

//         updatedProducts.push({ ...product, newPrice: 0 });
//       }
//     }

//     console.log(`Total de productos actualizados: ${updatedProducts.length}`);

//     return updatedProducts;
//   } catch (error) {
//     console.error("Error al guardar:", error.message);
//     throw error;
//   }
// };
