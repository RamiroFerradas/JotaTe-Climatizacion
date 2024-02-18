"use server";

import cloudinary from "../../lib/cloudinary";
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
  api_key: string;
}
export async function uploadImage(formData) {
  const enviroment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  try {
    const file = formData.get("image");
    const brand = formData.get("brand");
    const name = formData.get("name");
    const category = formData.get("category");
    const subcategory = formData.get("subcategory");

    if (!file) {
      throw new Error("No se ha detectado una imagen para subir");
    }

    const arrayBuffer = await file.arrayBuffer();

    var mime = file.type;
    var encoding = "base64";
    var base64Data = Buffer.from(arrayBuffer).toString("base64");
    var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
    const uniqueParams = [brand, category, subcategory, name].filter(
      (param, index, array) => array.indexOf(param) === index
    );

    const folderPath = uniqueParams.join("/");
    const finalFolderPath = `${
      enviroment === "dev" ? "DEV" : "JotaTe Climatizacion"
    }/${folderPath}`;
    const result = await new Promise((resolve, reject) => {
      var result = cloudinary.uploader
        .upload(fileUri, {
          invalidate: true,
          folder: finalFolderPath,
        })
        .then((result) => {
          console.log(result);
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });

    let imageUrl = (result as CloudinaryResponse).secure_url;

    return {
      message: "Imagen subida correctamente",
      url: imageUrl,
    };
  } catch (error) {
    return {
      error: "Error al subir la imagen a Cloudinary: " + error.message,
    };
  }
}
