"use client";
// import { products } from "@/api/producjs";
import Image from "next/image";
import { Suspense, useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FcNext, FcPrevious } from "react-icons/fc";
import { settings } from "./settingsSlider";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import Link from "next/link";
import SkeletonFeatured from "./skeletonFeatured";
import { Product } from "@/app/models";

type Props = {
  products: Product[];
};

const SwipperProducts = ({ products }: Props) => {
  const slider = useRef<Slider>(null);

  const [isDraggin, setIsDraggin] = useState(false);

  const productosDestacadosFiltrados = products.filter(
    (prod: Product) =>
      prod.image.some((img) => typeof img === "string") && prod.destacado
  );

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
          {productosDestacadosFiltrados.map((prod: Product, i) => (
            <Suspense fallback={<SkeletonFeatured key={i} />}>
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
                    href={`/productos-v2/${prod.id}`}
                    className="border-2 border-[#d3a265] rounded-lg uppercase px-5 text-sm transition-all hover:bg-[#d3a165b8] flex items-center  text-center justify-center flex-col h-12 w-52"
                  >
                    <p className="font-semibold">Consultar</p>
                  </Link>
                </div>
              </div>
            </Suspense>
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
