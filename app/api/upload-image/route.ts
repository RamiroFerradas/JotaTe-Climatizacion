import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import cloudinary from "@/app/lib/cloudinary";
import fs from "fs";

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
      return NextResponse.json("No se ha detectado una imagen para subir");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", image.name);

    // Solo guarda la imagen localmente en entorno de desarrollo (dev)
    if (enviroment === "dev") {
      await writeFile(filePath, buffer);
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: `${
        enviroment === "dev" ? "DEV" : "JotaTe Climatizacion"
      }/${brand}/${category}/${subcategory}/${name}`,
    });

    // Elimina el archivo local después de subirlo a Cloudinary
    if (enviroment === "dev") {
      // Asegúrate de manejar cualquier error aquí si la eliminación falla
      fs.unlinkSync(filePath);
    }

    const resultCopy = { ...result };
    delete resultCopy.api_key;

    console.log(res);
    return NextResponse.json(resultCopy);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al subir la imagen a Cloudinary: " + error.message },
      { status: 404 }
    );
  }
}
