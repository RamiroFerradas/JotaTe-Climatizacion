import { Product } from "../models/Product";
import Papa from "papaparse";

const DB_URL =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_DB_BASE_URL as string)
    : (process.env.NEXT_PUBLIC_DB_BASE_URL_LOCAL as string);

const DB_URL_AUX =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_DB_BASE_URL_AUX as string)
    : (process.env.NEXT_PUBLIC_DB_BASE_URL_AUX_LOCAL as string);

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(DB_URL, {
      next: { revalidate: 10 },
      cache: "force-cache",
    });
    const blob = await response.blob();
    const text = await new Response(blob).text();

    return new Promise<Product[]>((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        complete: (results) => {
          const products = results.data as Product[];
          const filteredProducts = products.filter((product) => product.name);

          // Separar las URLs en un array si no están separadas por comas
          const productsWithMultipleImages = filteredProducts.map(
            (product: Product) => {
              let imageUrls: string[];
              if (Array.isArray(product.image)) {
                imageUrls = product.image;
              } else {
                imageUrls = (product.image as string)
                  .split(",")
                  .map((url: string) => url.trim());
              }
              return {
                ...product,
                image: imageUrls,
              };
            }
          );

          resolve(productsWithMultipleImages);
        },
        error: (error: Error) => reject(new Error(error.message)),
      });
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const inserProduct = async (data: Product) => {
  try {
    const response = await fetch(DB_URL_AUX, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("La solicitud POST se realizó correctamente.");
    } else {
      console.log("Error al realizar la solicitud POST:", response.status);
    }
  } catch (error) {
    console.log("Error al realizar la solicitud POST:", error);
  }
};
