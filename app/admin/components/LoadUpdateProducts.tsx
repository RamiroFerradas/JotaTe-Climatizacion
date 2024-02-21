import { Product } from "@/app/models";
import { CircularProgress } from "@mui/material";

type Props = {
  loading: boolean;
  productosPorActualizar: number;
  productsSelected: Product[];
};
export default function LoadUpdateProducts({
  loading,
  productosPorActualizar,
  productsSelected,
}: Props) {
  return loading ? (
    <div className="fixed top-0 left-0 w-full h-full bg-white/50 z-50 flex justify-center items-center flex-col backdrop-blur-[1px]">
      {productosPorActualizar > 0 && (
        <div className="flex justify-center items-center flex-col h-52">
          <p className="z-50 text-green-principal font-black text-2xl">
            {`Productos a actualizar: ${productsSelected.length}`}
          </p>
          <p className="z-50 text-green-principal font-black text-2xl">
            {`Productos restantes por actualizar: ${productosPorActualizar}`}
          </p>
        </div>
      )}
      <div className="h-52">
        <CircularProgress size={45} color="success" />
      </div>
    </div>
  ) : (
    <></>
  );
}
