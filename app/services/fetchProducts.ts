import { Product } from "../models";

const DB_URL = process.env.NEXT_PUBLIC_API_URL as string;
const TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

const headers = {
  "Content-Type": "application/json",
  Authorization: TOKEN,
};

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const url = `${DB_URL}/api/products`;
    const response = await fetch(url, { headers });

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
    const url = `${DB_URL}/api/products/${id}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error al obtener el producto con ID ${id}`);
    }
    const data = await response.json();
    console.log(data);
    return data as Product;
  } catch (error) {
    throw new Error(
      `Error al obtener el producto con ID ${id}: ` + error.message
    );
  }
}