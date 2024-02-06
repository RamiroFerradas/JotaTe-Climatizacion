import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import cloudinary from "@/app/lib/cloudinary";
import { headers } from "next/headers";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(request) {
  const enviroment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  try {
    const data = await request.formData();

    const image = data.get("image");
    const brand = data.get("brand");
    const name = data.get("name");
    const category = data.get("category");
    const subcategory = data.get("subcategory");

    if (!image) {
      return NextResponse.json("No se ha detectado una imagen para subir");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", image.name);

    await writeFile(filePath, buffer);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: `${
        enviroment === "dev" ? "DEV" : "JotaTe Climatizacion"
      }/${brand}/${category}/${subcategory}/${name}`,
    });

    // Crear una copia del objeto result y eliminar la propiedad api_key
    const resultCopy = { ...result };
    delete resultCopy.api_key;

    // Agregar las headers de CORS
    resultCopy.headers = corsHeaders;

    // Devolver la copia adaptada del resultado sin la propiedad api_key

    return NextResponse.json(resultCopy);
  } catch (error) {
    console.error("Error al subir la imagen a Cloudinary:", error.message);
    throw error;
  }
}
