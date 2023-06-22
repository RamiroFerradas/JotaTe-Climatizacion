import Link from "next/link";
import { SwipperProducts } from "./SwipperProducts";

export type FeaturedProps = {};

const Featured: React.FC<FeaturedProps> = () => {
  return (
    <section
      className="min-h-[100vh] flex justify-center items-center flex-col gap-20"
      id="featured"
    >
      <div className="flex flex-col">
        <div className="text-5xl font-bold flex flex-wrap justify-center items-center gap-3">
          <p className="text-[#161616]">Productos</p>
          <p className="text-[#d18d3a]">destacados</p>
        </div>
      </div>
      <div className="w-full">
        <SwipperProducts />
      </div>
      <div className="p-10">
        <Link
          className="border-2 border-[#d3a265] rounded-lg uppercase px-5 text-sm transition-all hover:bg-[#d3a165b8] flex items-center h-12 w-52 text-center justify-center"
          href="/productos"
        >
          <p className="font-semibold">Ver todos los productos</p>
        </Link>
      </div>
    </section>
  );
};

export default Featured;
