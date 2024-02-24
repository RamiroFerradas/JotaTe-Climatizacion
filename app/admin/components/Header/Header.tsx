import jotaTeLogoResponsive from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté símbolo1.png";
import jotaTeLogo from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import { IoMdAddCircleOutline, IoMdSave } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useScreenSize } from "@/app/hooks";
import { toastErrorAdmin, toastOkAdmin } from "@/app/utilities/toastAdmin";
import { updateProductsV2 } from "@/app/services/crud/updateProduct";
import { Searchbar } from "@/app/productos/components";
import { Product } from "@/app/models";
import { Dispatch, SetStateAction } from "react";
import ButtonLogout from "../ButtonLogout";
import Image from "next/image";

type Props = {
  setFilteredProducts: Dispatch<SetStateAction<Product[]>>;
  updatedFilteredProducts: (updatedFilteredProducts: Product[]) => void; // Ajustar el tipo aquí
  selected: Product[];
  setOpenModalForm: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setProductosPorActualizar: Dispatch<SetStateAction<number>>;
  setSelected: Dispatch<React.SetStateAction<Product[]>>;
  updateProductInSelected: (
    prevSelected: Product[],
    productId: string,
    updateProps: any
  ) => Product[];
};
export default function Header({
  setFilteredProducts,
  setOpenModalForm,
  updatedFilteredProducts,
  selected,
  setLoading,
  setProductosPorActualizar,
  setSelected,
}: Props) {
  const { isMobile } = useScreenSize();

  const handleSubmit = async () => {
    if (!selected || selected.length === 0) return;

    setLoading(true);

    try {
      const batchSize = 10;
      const totalProducts = selected.length;
      setProductosPorActualizar(totalProducts);
      const batches = Math.ceil(totalProducts / batchSize);
      for (let i = 0; i < batches; i++) {
        const startIdx = i * batchSize;
        const endIdx = Math.min((i + 1) * batchSize, totalProducts);
        const batchToUpdate = selected.slice(startIdx, endIdx);
        setProductosPorActualizar(
          totalProducts - (startIdx + batchToUpdate.length)
        );
        const response = await updateProductsV2(batchToUpdate);

        // Actualiza el estado de los productos filtrados
        updatedFilteredProducts(response);
      }
      const message =
        selected.length < 1 ? "Productos actualizados" : "Producto actualizado";
      toastOkAdmin(message);
    } catch (error) {
      toastErrorAdmin(error.message);
    } finally {
      setLoading(false);
      setSelected([]);
    }
  };
  return (
    <div className="container mx-auto flex items-center justify-between text-blue-gray-900 w-screen py-1 n">
      <Link href={"/"}>
        {isMobile ? (
          <Image
            src={jotaTeLogoResponsive}
            alt="logo_jota_te"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        ) : (
          <Image
            src={jotaTeLogo}
            alt="logo_jota_te"
            width={130}
            height={130}
            className="cursor-pointer"
          />
        )}
      </Link>

      <Searchbar onChangue setProductsFiltered={setFilteredProducts} />

      <div className="flex gap-1 md:gap-2 justify-center items-center">
        <Button
          size="sm"
          className="hidden md:block rounded bg-[#F65B36] border border-[#F65B36]  "
          onClick={() => setOpenModalForm(true)}
        >
          <span className="hidden md:block">Nuevo prodcuto</span>
          <IoMdAddCircleOutline size={24} className="block md:hidden" />
        </Button>
        <Button
          size="sm"
          className="rounded bg-[#006d54] border border-[#006d54] "
          onClick={handleSubmit}
          disabled={selected.length === 0}
        >
          <span className="hidden md:block">Guardar cambios</span>
          <IoMdSave size={24} className="block md:hidden" />
        </Button>

        <ButtonLogout />
      </div>
    </div>
  );
}
