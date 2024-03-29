"use client";
import jotateLogo from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté logotipo1.png";
import { Image } from "@unpic/react/nextjs";
import { useRouter } from "next/navigation";

type Props = {};
export default function NotFound({}: Props) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col pb-16 gap-10">
      <Image src={jotateLogo} alt="Logo" width={120} height={120} />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-600">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <div className="mt-8">
          <p
            onClick={() => router.push("/")}
            className="text-green-principal hover:underline cursor-pointer"
          >
            Volver a la página de inicio
          </p>
        </div>
      </div>
    </div>
  );
}
