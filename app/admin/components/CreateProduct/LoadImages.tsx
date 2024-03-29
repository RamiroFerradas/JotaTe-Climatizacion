"use client";

import { useState } from "react";
import noimage from "@/public/no-image.png";
import { Image } from "@unpic/react/nextjs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CircularProgressWithLabel } from "..";
import { Controller } from "react-hook-form";
import { uploadImage } from "@/app/services/crud/uploadImage";
import { Product } from "@/app/models";
import { formattedJsonToImagesArray } from "@/app/utilities/formattedImagesArrayToJson";

type Props = {
  method: any;
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
  editProduct: Product;
};

export default function LoadImages({
  method,
  uploadedImages,
  setUploadedImages,
  editProduct,
}: Props) {
  const {
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = method;

  const [loadImage, setLoadImage] = useState(false);
  const [errorLoadImage, setErrorLoadImage] = useState(false);

  const handleFileChange = async (e: any) => {
    const image = e.target.files[0];
    try {
      setErrorLoadImage(false);
      setLoadImage(true);
      const formData = new FormData();
      const product = getValues();
      formData.append("image", image);
      // formData.append("name", product.name);
      // formData.append("brand", product.brand.value);
      // formData.append("category", product.category.value);
      // formData.append("subcategory", product.subcategory.value);

      const modifiedName = product.name.replace(/\//g, "-").replace(/\s+/g, "");
      formData.append("name", modifiedName);
      Object.entries(product).forEach(([key, value]) => {
        formData.append(
          key,
          ["brand", "category", "subcategory"].includes(key) &&
            typeof value === "object"
            ? (value as any).value
            : value
        );
      });

      const data = await uploadImage(formData);
      if (!data.error) {
        setUploadedImages((prevImages) => [...prevImages, data.url]);
        setLoadImage(false);
      }
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      setLoadImage(false);
      console.error(error.message);
      setErrorLoadImage(true);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };

  return (
    <section id="load-images">
      <div className="flex flex-wrap items-center justify-start w-full min-h-[30vh] max-h-[65vh] gap-3 overflow-y-auto">
        {loadImage && (
          <div className="relative group h-48 w-48 shadow-lg flex justify-center items-center">
            <CircularProgressWithLabel />
          </div>
        )}
        {uploadedImages.map((url, index) => (
          <div key={index} className="relative group h-48 shadow-lg">
            <Image
              width={192}
              height={192}
              src={url}
              className={`${"spect-square"} object-cover p-2 group-hover:grayscale h-48`}
              alt="Image"
            />
            <div
              className="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-300 opacity-0 cursor-pointer group-hover:opacity-100 group-hover:bg-gray-500 group-hover:bg-opacity-40"
              onClick={() => handleDeleteImage(index)}
            >
              <RiDeleteBin6Line size={24} color="#fff" />
            </div>
          </div>
        ))}

        <Controller
          name="image"
          control={control}
          rules={{
            validate: (value: string) => {
              if (
                !Array.isArray(uploadedImages) ||
                uploadedImages.length === 0
              ) {
                return "Debe seleccionar al menos una imagen";
              }

              if (uploadedImages.some((imageUrl) => imageUrl.trim() === "")) {
                return "Las URLs de las imágenes no deben estar vacías";
              }

              return true;
            },
          }}
          render={({ field }) => (
            <label className="relative group inline-flex flex-col items-center justify-center border-[1px] h-48 border-gray-200 rounded-md shadow-lg">
              <Image
                width={192}
                height={192}
                src={noimage}
                className={`${"spect-square"} object-cover p-2 group-hover:grayscale`}
                alt="Image"
              />
              <div className="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-300 opacity-0 cursor-pointer group-hover:opacity-100 group-hover:bg-gray-500 group-hover:bg-opacity-40">
                <p className="px-2 py-1 font-semibold text-gray-700 bg-white rounded-md shadow-lg whitespace-nowrap">
                  Elegir archivo
                </p>
              </div>
              <input
                type="file"
                name="imageInput"
                style={{ display: "none" }}
                {...field}
                onChange={(e) => {
                  clearErrors("image");
                  handleFileChange(e);
                }}
              />
            </label>
          )}
        />
      </div>
      {errors?.image && <p className="text-red-500">{errors.image.message}</p>}
    </section>
  );
}
