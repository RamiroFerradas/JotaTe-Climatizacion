import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import cloudinary from "@/app/lib/cloudinary";
// import NextCors from "nextjs-cors";

export async function POST(req, res) {
  const enviroment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  try {
    const data = await req.formData();

    const image = data.get("image");
    const brand = data.get("brand");
    const name = data.get("name");
    const category = data.get("category");
    const subcategory = data.get("subcategory");

    // res.headers.append("Access-Control-Allow-Credentials", "false");
    // res.headers.append("Access-Control-Allow-Origin", "*");
    // res.headers.append(
    //   "Access-Control-Allow-Methods",
    //   "GET,DELETE,PATCH,POST,PUT"
    // );
    // res.headers.append(
    //   "Access-Control-Allow-Headers",
    //   "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date"
    // );

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

    const resultCopy = { ...result };
    delete resultCopy.api_key;
    // await NextCors(req, res, {
    //   // Options
    //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    //   origin: "*",
    //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    // });
    console.log(res);
    return NextResponse.json(resultCopy);
  } catch (error) {
    // throw error("Error al subir la imagen a Cloudinary:", error.message);
    return NextResponse.json(
      { error: "Error al subir la imagen a Cloudinary: " + error.message },
      { status: 404 }
    );
  }
}
