import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/app/models/Product";
import { IoIosClose } from "react-icons/io";
import { addProduct } from "@/app/services/crud/addProduct";
import InformationProduct from "./InformationProduct";
import { Tabs, Tab } from "@mui/material";
import LoadImages from "./LoadImages";
import { OptionType } from "@/app/models/OptionType";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import {
  formattedImagesArrayToJson,
  formattedJsonToImagesArray,
} from "@/app/utilities/formattedImagesArrayToJson";
import { updateProductsV2 } from "@/app/services/crud/updateProduct";
import { toastErrorAdmin, toastOkAdmin } from "@/app/utilities/toastAdmin";

type FormPricingProps = {
  setOpenModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  optionsSubcategory: OptionType[];
  optionsCategory: OptionType[];
  optionsBrands: OptionType[];
  editProduct: Product;
  setEditProduct: React.Dispatch<React.SetStateAction<Product>>;
  updatedFilteredProducts: (product: Product[]) => void;
};

export default function FormCreateProduct({
  setOpenModalForm,
  optionsSubcategory,
  optionsCategory,
  optionsBrands,
  editProduct,
  setEditProduct,
  updatedFilteredProducts,
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
    },
  });
  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = method;
  const formValues = watch();
  const [section, setSection] = useState<"info" | "images">("info");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const refModal = useRef(null);
  // useOnClickOutside(refModal, () => setOpenModalForm(false));
  const onSubmit = async (data: Product) => {
    try {
      if (!uploadedImages.length) {
        setSection("images");

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
        const productToUpdate = await updateProductsV2([
          {
            ...data,
            image: formattedImagesArrayToJson(uploadedImages) as any,
            brand: brandValue,
            category: categoryValue,
            subcategory: subcategoryValue,
            id: editProduct.id,
          },
        ]);

        updatedFilteredProducts(productToUpdate);
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

    if (!brand || !category || !subcategory) {
      setSection("info");
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
          Nuevo producto
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
          <Tab value="info" label="Informacion" />
          <Tab
            disabled={
              !formValues.brand ||
              !formValues.name ||
              !formValues.category ||
              !formValues.subcategory
            }
            value="images"
            label="Imagenes"
          />
        </Tabs>

        {section === "info" && (
          <InformationProduct
            method={method}
            optionsCategory={optionsCategory}
            optionsSubcategory={optionsSubcategory}
            optionsBrands={optionsBrands}
            editProduct={editProduct}
          />
        )}
        {section === "images" && (
          <LoadImages
            method={method}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            editProduct={editProduct}
          />
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
