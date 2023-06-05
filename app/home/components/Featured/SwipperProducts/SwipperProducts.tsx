"use client";
// import { products } from "@/api/producjs";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FcNext, FcPrevious } from "react-icons/fc";
import { settings } from "./settingsSlider";
import useProductList from "@/app/hooks/useProductList";
import { parseCurrency } from "@/app/utilities/parseCurrency";

const SwipperProducts = () => {
  const slider = useRef<Slider>(null);

  const [isDraggin, setIsDraggin] = useState(false);

  const { products } = useProductList();

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
          {products.map((prod, i) => (
            <div
              className="relative flex items-center justify-center flex-col text-center"
              key={i}
              // onClick={() => setdraggin(true)}
              onMouseUp={() => setIsDraggin(false)}
              onMouseDown={() => setIsDraggin(true)}
              // onDrag={}
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
