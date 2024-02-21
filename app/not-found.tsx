import Link from "next/link";

type Props = {};
export default function NotFound({}: Props) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-600">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:underline">
            Volver a la página de inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
