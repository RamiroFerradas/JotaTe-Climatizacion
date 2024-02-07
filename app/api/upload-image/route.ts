import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import cloudinary from "@/app/lib/cloudinary";
import fs from "fs";
interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  api_key: string; // No incluir api_key en la interfaz si quieres omitirlo
}

export async function POST(req, res) {
  const enviroment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  try {
    const data = await req.formData();

    const image = data.get("image");
    const brand = data.get("brand");
    const name = data.get("name");
    const category = data.get("category");
    const subcategory = data.get("subcategory");

    if (!image) {
      throw new Error("No se ha detectado una imagen para subir");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // const filePath = path.join(process.cwd(), "public", image.name);

    const response: CloudinaryResponse = await new Promise<CloudinaryResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `${
                enviroment === "dev" ? "DEV" : "JotaTe Climatizacion"
              }/${brand}/${category}/${subcategory}/${name}`,
            },
            (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result as any);
            }
          )
          .end(buffer);
      }
    );
    if (response && response.api_key) {
      delete response.api_key;
    }
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al subir la imagen a Cloudinary: " + error.message },
      { status: 404 }
    );
  }
}
