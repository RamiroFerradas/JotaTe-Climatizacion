"use server";

import cloudinary from "../lib/cloudinary";
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
  "use server";
  const enviroment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  try {
    // const data = await req.formData();
    console.log(formData);
    const file = formData.get("image");
    const brand = formData.get("brand");
    const name = formData.get("name");
    const category = formData.get("category");
    const subcategory = formData.get("subcategory");

    if (!file) {
      throw new Error("No se ha detectado una imagen para subir");
    }
    const { resources: sneakers } = await cloudinary.api.resources_by_tag(
      "nextjs-server-actions-upload-sneakers"
    );
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.uploader
          .upload(fileUri, { invalidate: true })
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    // const fileBuffer = await image.arrayBuffer();
    var mime = file.type;
    var encoding = "base64";
    var base64Data = Buffer.from(arrayBuffer).toString("base64");
    var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    const result = await uploadToCloudinary();

    let imageUrl = (result as CloudinaryResponse).secure_url;
    console.log(imageUrl);
    // const response: CloudinaryResponse = await new Promise<CloudinaryResponse>(
    //   (resolve, reject) => {
    //     cloudinary.uploader
    //       .upload_stream(
    //         {
    //           folder: `${
    //             enviroment === "dev" ? "DEV" : "JotaTe Climatizacion"
    //           }/${brand}/${category}/${subcategory}/${name}`,
    //           tags: ["nextjs-server-actions-upload-sneakers"],
    //         },
    //         (err, result) => {
    //           if (err) {
    //             reject(err);
    //             throw new Error(err.message);
    //           }
    //           resolve(result as any);
    //         }
    //       )
    //       .end(buffer);
    //   }
    // );
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
