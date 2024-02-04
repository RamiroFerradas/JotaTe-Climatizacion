import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/app/models/Product";
import { IoIosClose } from "react-icons/io";
import { useOnClickOutside } from "@/app/hooks/onClickOutsideRef";
import { addProduct } from "@/app/services/addProduct";
import InformationProduct from "./InformationProduct";
import { Tabs, Tab } from "@mui/material";
import LoadImages from "./LoadImages";
import { OptionType } from "@/app/models/OptionType";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";

type FormPricingProps = {
  setOpenModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  optionsSubcategory: OptionType[];
  optionsCategory: OptionType[];
  optionsBrands: OptionType[];
  setSnackBarMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorSnackBar: React.Dispatch<React.SetStateAction<string>>;
};

export default function FormCreateProduct({
  setOpenModalForm,
  optionsSubcategory,
  optionsCategory,
  optionsBrands,
  setErrorSnackBar,
  setSnackBarMessage,
}: FormPricingProps) {
  const method = useForm<Product>({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      brand: "",
      category: "",
      subcategory: "",
      image: [],
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
    const formattedImages = `{${uploadedImages.join(",")}}`;

    try {
      if (!uploadedImages.length) {
        setSection("images");

        setError("image", {
          type: "manual",
          message: "Debe cargar al menos una imagen",
        });

        return;
      }

      await addProduct({
        ...data,
        image: formattedImages as any,
        brand: (formValues.brand as OptionType).value,
        category: (formValues.category as OptionType).value,
        subcategory: (formValues.subcategory as OptionType).value,
      });
      setSnackBarMessage("Producto creado con exito");
      setOpenModalForm(false);
      reset();
    } catch (error) {
      console.error(error.message);
      setSnackBarMessage(`Error al crear el producto: , ${error.message}`);
      setErrorSnackBar(`Error al crear el producto: , ${error.message}`);
    }
  };
  const handleClose = () => {
    setOpenModalForm(false);
  };
  console.log();
  useEffect(() => {
    const brand = watch("brand");
    const category = watch("category");
    const subcategory = watch("subcategory");

    if (!brand || !category || !subcategory) {
      setSection("info");
    }
  }, [watch("brand"), watch("category"), watch("subcategory")]);

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
          />
        )}
        {section === "images" && (
          <LoadImages
            method={method}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        )}

        <div className="flex justify-end items-end w-full">
          <button
            className="bg-orange-principal px-4 py-2 rounded-md text-white text-sm"
            type="submit"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
