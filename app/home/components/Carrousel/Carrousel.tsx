"use client";

import { CarrouselImages } from "@/app/models/Carrousel";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

interface CarrouselProps {
  dataImage: CarrouselImages[];
  className?: string;
}

const Carrousel = ({ dataImage, className }: CarrouselProps) => {
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
      {dataImage?.map((img: CarrouselImages, index) => {
        return (
          <Image
            key={index}
            src={img.src}
            alt={img.alt}
            priority
            className={className}
          />
        );
      })}
    </Carousel>
  );
};
export default Carrousel;
