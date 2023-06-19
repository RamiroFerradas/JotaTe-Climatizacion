import { Product } from "../models";

const DB_URL = process.env.NEXT_PUBLIC_API_URL as string;

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const url = `${DB_URL}/api/products`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    const data = await response.json();
    return data as Product[];
  } catch (error) {
    throw new Error("Error al obtener los productos: " + error.message);
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const url = `${DB_URL}/api/products?id=${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener el producto con ID ${id}`);
    }
    const data = await response.json();
    return data as Product;
  } catch (error) {
    throw new Error(
      `Error al obtener el producto con ID ${id}: ` + error.message
    );
  }
}
