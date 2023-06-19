import { Product } from "@/app/models";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";

export type ImagesProductProps = {
  selectedProduct: Product;
};

const ImagesProduct: React.FC<ImagesProductProps> = ({ selectedProduct }) => {
  const images = selectedProduct?.image;

  const imagesLengthCondition = images?.length > 1;

  return (
    <div className="flex items-center flex-col md:flex-row h-96 md:h-56 overflow-hidden justify-center max-w-2xl">
      <Carousel
        loop
        className="rounded-xl overflow-hidden"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 l">
            {images?.length > 1 &&
              new Array(length)
                .fill("")
                .map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i
                        ? "bg-teal-500 w-8"
                        : "bg-teal-500/50 w-4"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="teal"
            size="lg"
            onClick={handlePrev}
            className={`${
              !imagesLengthCondition && `hidden`
            } !absolute top-2/4 -translate-y-2/4 left-4`}
          >
            <ChevronLeftIcon strokeWidth={10} className="w-10 h-10" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="teal"
            size="lg"
            onClick={handleNext}
            className={`${
              !imagesLengthCondition && `hidden`
            } !absolute top-2/4 -translate-y-2/4 !right-4`}
          >
            <ChevronRightIcon strokeWidth={2} className="w-10 h-10" />
          </IconButton>
        )}
      >
        {images?.map((img: string, i: number) => (
          <div
            key={i}
            className="flex items-center justify-center overflow-hidden"
          >
            <Image
              priority
              width={350}
              height={200}
              src={img}
              alt={selectedProduct.name}
              className="rounded-xl max-w-2xl object-contain h-60"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagesProduct;
