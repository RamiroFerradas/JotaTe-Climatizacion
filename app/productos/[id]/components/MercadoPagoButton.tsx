import { Product } from "@/app/models";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  selectedProduct: Product;
};
export default function MercadoPagoButton({ selectedProduct }: Props) {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const handlePayMercadoPago = async () => {
    setloading(true);
    const body = { unit_price: Number(selectedProduct.price) };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }

      const data = await response.json();
      if (data.init_point) {
        router.push(data.init_point);
        setloading(false);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
    }
  };
  return (
    <button
      onClick={handlePayMercadoPago}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 flex items-center justify-center"
    >
      {loading ? <Spinner /> : `Pagar con Mercado Pago`}
    </button>
  );
}
