import axios from "axios";
import { Product } from "../models/Product";
import Papa from "papaparse";

const DB_URL = process.env.NEXT_PUBLIC_DB_BASE_URL as string;

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(DB_URL, {
      responseType: "blob",
    });
    return new Promise<Product[]>((resolve, reject) => {
      Papa.parse(response.data, {
        header: true,
        complete: (results) => {
          const products = results.data as Product[];
          const filteredProducts = products.filter((product) => product.name);
          resolve(filteredProducts);
        },
        error: (error) => reject(error.message),
      });
    });
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}
