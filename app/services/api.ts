import { Product } from "../models/Product";
import Papa from "papaparse";

const DB_URL = process.env.NEXT_PUBLIC_DB_BASE_URL as string;

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}

export async function fetchProducts(): Promise<Product[]> {
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
          resolve(filteredProducts);
        },
        error: (error: Error) => reject(error.message),
      });
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
