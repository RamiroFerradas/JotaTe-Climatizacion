import { Product } from "@/app/models";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { TABLE_PRODUCTS } from "@/app/constants";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";

const DB_URL = process.env.NEXT_PUBLIC_DB_BASE_URL as string;
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
      const product = getProductById(id);
      return NextResponse.json(product);
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
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select("*")
      .eq("visible", "true")
      .eq("id", id);
    const productsWithParsedImages = data.map((product) => ({
      ...product,
      image: formattedJsonToImagesArray(product.image || ""),
    }));

    if (error) {
      throw new Error();
    }
    // const data = await response.json();

    return productsWithParsedImages[0] as Product;
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getAllProducts() {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
      .from(TABLE_PRODUCTS)
      .select("*")
      .eq("visible", "true");
    if (error) {
      throw new Error(`Error al obtener datos de Supabase: ${error.message}`);
    }

    // Procesar las imágenes para convertirlas en arrays de strings
    const productsWithParsedImages = data.map((product) => ({
      ...product,
      image: formattedJsonToImagesArray(product.image || ""),
    }));

    return productsWithParsedImages;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
