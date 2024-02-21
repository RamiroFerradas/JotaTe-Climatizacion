"use server";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";
import { fetchProducts } from "../fetchs/fetchProducts";

export async function FilterProductsByBrand(
  uniqueBrands: string[],
  subCategoryActive?: string
) {
  subCategoryActive = subCategoryActive === "Todos" ? "" : subCategoryActive;

  try {
    const allProducts = await fetchProducts();

    // Filtrar productos
    const filteredProducts = allProducts.filter((product) => {
      const matchesBrand =
        uniqueBrands.length === 0 ||
        uniqueBrands.includes(product.brand as string);
      const matchesSubcategory =
        !subCategoryActive || product.subcategory === subCategoryActive;

      return matchesBrand && matchesSubcategory;
    });

    // Mapear y procesar imágenes
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
