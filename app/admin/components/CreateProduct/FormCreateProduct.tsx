"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/app/models/Product";
import { IoIosClose } from "react-icons/io";
import { addProduct } from "@/app/services/crud/addProduct";
import InformationProduct from "./InformationProduct";
import { Tabs, Tab } from "@mui/material";
import LoadImages from "./LoadImages";
import { OptionType } from "@/app/models/OptionType";
import {
  formattedImagesArrayToJson,
  formattedJsonToImagesArray,
} from "@/app/utilities/formattedImagesArrayToJson";
import { toastErrorAdmin, toastOkAdmin } from "@/app/utilities/toastAdmin";
import { updateProduct } from "@/app/services/crud/updateProduct";
import RecommendedProducts from "./RecommendedProducts";

type FormPricingProps = {
  setOpenModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  optionsSubcategory: OptionType[];
  optionsCategory: OptionType[];
  optionsBrands: OptionType[];
  editProduct: Product;
  products: Product[];
  setEditProduct: React.Dispatch<React.SetStateAction<Product>>;
  updatedFilteredProducts: (product: Product[]) => void;
};
enum Section {
  Info = "info",
  Images = "images",
  Recommended = "recommended",
}
export default function FormCreateProduct({
  setOpenModalForm,
  optionsSubcategory,
  optionsCategory,
  optionsBrands,
  editProduct,
  setEditProduct,
  updatedFilteredProducts,
  products,
}: FormPricingProps) {
  const method = useForm<Product>({
    mode: "onChange",
    defaultValues: {
      name: editProduct?.name || "",
      description: editProduct?.description || "",
      price: editProduct?.price || 0,
      stock: editProduct?.stock || 0,
      brand: editProduct?.brand || "",
      category: editProduct?.category || "",
      subcategory: editProduct?.subcategory || "",
      image: [],
      visible: true,
      destacado: false,
      recommended: editProduct?.recommended || [],
    },
  });

  const { handleSubmit, clearErrors, watch, reset, setError } = method;
  const formValues = watch();
  const [section, setSection] = useState<Section>(Section.Info);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const refModal = useRef(null);
  // useOnClickOutside(refModal, () => setOpenModalForm(false));
  const onSubmit = async (data: Product) => {
    try {
      if (!uploadedImages.length) {
        setSection(Section.Images);

        setError("image", {
          type: "manual",
          message: "Debe cargar al menos una imagen",
        });

        return;
      }

      const brandValue =
        typeof formValues.brand === "string"
          ? formValues.brand
          : (formValues.brand as OptionType)?.value;
      const categoryValue =
        typeof formValues.category === "string"
          ? formValues.category
          : (formValues.category as OptionType)?.value;
      const subcategoryValue =
        typeof formValues.subcategory === "string"
          ? formValues.subcategory
          : (formValues.subcategory as OptionType)?.value;

      if (!editProduct) {
        await addProduct({
          ...data,
          image: formattedImagesArrayToJson(uploadedImages) as any,
          brand: brandValue,
          category: categoryValue,
          subcategory: subcategoryValue,
        });
      } else {
        const productToUpdate = await updateProduct({
          ...data,
          image: formattedImagesArrayToJson(uploadedImages) as any,
          brand: brandValue,
          category: categoryValue,
          subcategory: subcategoryValue,
          id: editProduct.id,
        });

        updatedFilteredProducts([productToUpdate]);
      }

      toastOkAdmin("Producto creado con exito");
      setOpenModalForm(false);
      reset();
    } catch (error) {
      console.error(error.message);
      toastErrorAdmin(`Error al crear el producto: , ${error.message}`);
    }
  };
  const handleClose = () => {
    setOpenModalForm(false);
    setEditProduct(null);
  };
  useEffect(() => {
    const brand = watch("brand");
    const category = watch("category");
    const subcategory = watch("subcategory");

    if (
      (!brand || !category || !subcategory) &&
      section !== Section.Recommended
    ) {
      setSection(Section.Info);
    }
  }, [formValues]);

  useEffect(() => {
    if (editProduct?.image) {
      const formattedImagesArray = Array.isArray(editProduct?.image)
        ? editProduct?.image
        : formattedJsonToImagesArray(editProduct?.image);

      setUploadedImages(formattedImagesArray);
      clearErrors("image");
    } else {
      setUploadedImages([]);
    }
  }, [editProduct?.image]);

  return (
    <div
      ref={refModal}
      className="lg:w-[55%] min-h-[50vh] bg-white flex justify-start lg:items-start flex-col rounded-3xl px-10 lg:px-24 py-5 gap-5 border-green-principal border relative"
    >
      <button
        onClick={handleClose}
        className="absolute right-0 top-0 p-2 text-2xl"
      >
        <IoIosClose />
      </button>
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-orange-principal text-xl font-semibold">
          {!editProduct ? `Nuevo producto` : editProduct.name}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items items-start gap-2 w-full"
      >
        <Tabs
          value={section}
          onChange={(event, newValue) => setSection(newValue)}
          textColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value={Section.Info} label="Informacion" />
          <Tab
            disabled={
              !formValues.brand ||
              !formValues.name ||
              !formValues.category ||
              !formValues.subcategory
            }
            value={Section.Images}
            label="Imagenes"
          />

          <Tab value={Section.Recommended} label="Productos recomendados" />
        </Tabs>

        {section === Section.Info && (
          <InformationProduct
            method={method}
            optionsCategory={optionsCategory}
            optionsSubcategory={optionsSubcategory}
            optionsBrands={optionsBrands}
            editProduct={editProduct}
          />
        )}

        {section === Section.Images && (
          <LoadImages
            method={method}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            editProduct={editProduct}
          />
        )}
        {section === Section.Recommended && (
          <RecommendedProducts method={method} products={products} />
        )}

        <div className="flex justify-end items-end w-full">
          <button
            className="bg-orange-principal px-4 py-2 rounded-md text-white text-sm"
            type="submit"
          >
            {editProduct ? "Actualizar producto" : "Crear producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
