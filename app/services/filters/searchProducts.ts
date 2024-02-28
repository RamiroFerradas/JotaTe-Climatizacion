"use server";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";
import { Product } from "@/app/models";

export async function searchProducts(query: string, productsData: Product[]) {
  try {
    let searchByName = true;
    let filteredProducts: Product[] = [];

    if (query.trim() !== "") {
      filteredProducts = productsData.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      searchByName = false;
      filteredProducts = productsData;
    }

    if (filteredProducts.length === 0 && !searchByName) {
      const productById = productsData.find((product) => product.id === query);

      if (productById) {
        const productWithParsedImages = {
          ...productById,
          image: formattedJsonToImagesArray(productById.image || ""),
        };
        return [productWithParsedImages];
      }
    }

    const productsWithParsedImages = filteredProducts.map((product) => ({
      ...product,
      image: formattedJsonToImagesArray(product.image || ""),
    }));

    return productsWithParsedImages;
  } catch (error) {
    console.error("Error al buscar productos localmente:", error.message);
    return [];
  }
}
