import { Product } from "@/app/models";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Carousel, DialogBody, IconButton } from "@material-tailwind/react";
import Image from "next/image";

export type ImagesProductProps = {
  selectedProduct: Product;
};

const ImagesProduct: React.FC<ImagesProductProps> = ({ selectedProduct }) => {
  return (
    <DialogBody divider>
      <div className="flex items-center flex-col md:flex-row">
        <div className="md:w-1/2 h-80 overflow-hidden flex justify-center items-center">
          <Carousel
            loop
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
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
                className="!absolute top-2/4 -translate-y-2/4 left-4"
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
                className="!absolute top-2/4 -translate-y-2/4 !right-4"
              >
                <ChevronRightIcon strokeWidth={2} className="w-10 h-10" />
              </IconButton>
            )}
          >
            {selectedProduct.image.map((img: string, i: number) => (
              <div key={i} className="flex items-center justify-center h-full">
                <Image
                  width={300}
                  height={100}
                  src={img}
                  alt={selectedProduct.name}
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="md:w-1/2 h-40 overflow-y-auto">
          <p>{selectedProduct.description}</p>
          <p className="text-gray-600 text-lg text-end">
            {parseCurrency(Number(selectedProduct.price))}
          </p>
        </div>
      </div>
    </DialogBody>
  );
};

export default ImagesProduct;
