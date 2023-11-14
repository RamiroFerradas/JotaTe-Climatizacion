import { Product } from "@/app/models";
import { findDuplicateIds } from "@/app/utilities/findDuplicateIds";
import { imagesToArray } from "@/app/utilities/imagesToArray";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import Papa from "papaparse";

const DB_URL =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_DB_BASE_URL as string)
    : (process.env.NEXT_PUBLIC_DB_BASE_URL_LOCAL as string);

const isProduction = process.env.NODE_ENV === "production";

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}
const TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

export async function GET(req: NextRequest, res: NextResponse) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");

  if (!authorization || authorization !== TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      return getProductById(id);
    } else {
      const allProduscts = await getAllProducts();
      return NextResponse.json(allProduscts);
    }
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getProductById(id: string) {
  try {
    const products = await getAllProducts();
    // Buscar el producto por su ID en la lista de productos
    const product = products.find((product) => product.id === id);

    if (product) {
      // Devolver el producto si se encuentra
      return NextResponse.json(product);
    } else {
      // Devolver una respuesta de error si no se encuentra el producto
      return NextResponse.json(
        { error: `Producto con ID ${id} no encontrado` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getAllProducts() {
  try {
    const response = await fetch(DB_URL, {
      // next: { revalidate: isProduction ? 1000 : 0 },
    });
    const blob = await response.blob();
    const text = await new Response(blob).text();

    const products = await new Promise<Product[]>((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        complete: (results) => {
          const parsedProducts = results.data as Product[];
          // Filtrar solo los productos que tengan "name" y "id"
          const filteredProducts = parsedProducts.filter(
            (product) => product.name && product.id
          );

          // Crear un array con las urls de las imagenes proporcionadas
          const productsWithMultipleImages = filteredProducts.map((product) =>
            imagesToArray(product)
          );

          resolve(productsWithMultipleImages);
        },
        error: (error: Error) => reject(new Error(error.message)),
      });
    });

    const duplicateIds = findDuplicateIds(products);
    if (duplicateIds.length) console.error("IDs duplicadas:", duplicateIds);

    const filteredProducts = products.filter(
      (product) => !duplicateIds.includes(product.id)
    );

    return filteredProducts;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
