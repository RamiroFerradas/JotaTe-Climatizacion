"use client";

import { Carousel } from "@material-tailwind/react";
import { Carrousel, carrouselData } from "./carrouselData";
import Image from "next/image";

const Carrousel = () => {
  return (
    <Carousel
      className="rounded-3xl"
      autoplay
      loop
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {carrouselData?.map((img: Carrousel, index) => {
        return (
          <Image
            key={index}
            src={img.src}
            alt={img.alt}
            className="h-80 w-full object-cover"
          />
        );
      })}
    </Carousel>
  );
};
export default Carrousel;
