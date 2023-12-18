"use client";
// import { products } from "@/api/producjs";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FcNext, FcPrevious } from "react-icons/fc";
import { settings } from "./settingsSlider";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import Link from "next/link";
import SkeletonFeatured from "./skeletonFeatured";
import { useProductList } from "@/app/hooks";

const SwipperProducts = () => {
  const slider = useRef<Slider>(null);

  const [isDraggin, setIsDraggin] = useState(false);

  const { products, loading } = useProductList();

  const productosDestacadosFiltrados = products.filter(
    (prod) =>
      prod.image.some((img) => typeof img === "string") &&
      prod.image.length > 0 &&
      prod.image[0] !== "" &&
      prod.destacado
  );

  const productosToAdd = productosDestacadosFiltrados.slice(
    0,
    3 - productosDestacadosFiltrados.length
  );
  const productosDestacados =
    productosDestacadosFiltrados.concat(productosToAdd);

  return (
    <div className="relative">
      <button
        onClick={() => slider?.current?.slickPrev()}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-5xl z-40"
      >
        <FcPrevious />
      </button>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...settings}
          className={`flex justify-center items-center flex-row cursor-grab ${
            isDraggin && `cursor-grabbing`
          }`}
        >
          {loading
            ? [1, 2, 3, 4].map((index) => <SkeletonFeatured key={index} />)
            : productosDestacados.map((prod, i) => (
                <div
                  className="relative flex items-center justify-center flex-col text-center w-full"
                  key={i}
                  onMouseUp={() => setIsDraggin(false)}
                  onMouseDown={() => setIsDraggin(true)}
                >
                  <div>
                    <p className="text-xl font-bold uppercase">{prod.name}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center my-6 h-72 overflow-hidden">
                    <Image
                      height={300}
                      width={300}
                      src={prod.image[0]}
                      alt="asparri"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-[#f18500] font-black text-2xl">
                      {parseCurrency(Number(prod.price))}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Link
                      href={`/productos/${prod.id}`}
                      className="border-2 border-[#d3a265] rounded-lg uppercase px-5 text-sm transition-all hover:bg-[#d3a165b8] flex items-center  text-center justify-center flex-col h-12 w-52"
                    >
                      <p className="font-semibold">Consultar</p>
                    </Link>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
      <button
        onClick={() => slider?.current?.slickNext()}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-5xl z-40"
      >
        <FcNext />
      </button>
    </div>
  );
};

export default SwipperProducts;
