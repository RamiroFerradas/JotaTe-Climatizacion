import { Loading } from "@/app/components";
import { Product } from "@/app/models";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";

export type ImagesProductProps = {
  selectedProduct: Product;
  zoom: boolean;
  setZoom: (zoom: boolean) => void;
};

const ImagesProduct: React.FC<ImagesProductProps> = ({
  selectedProduct,
  zoom,
  setZoom,
}) => {
  const images = selectedProduct?.image;
  const imagesLengthCondition = images?.length > 1;

  return (
    <div
      className={`flex items-center flex-col md:flex-row h-96 justify-center mdmax-w-2xl ${
        zoom ? `md:h-screen ` : `md:h-56 overflow-hidden`
      }`}
    >
      <Carousel
        loop
        autoplay
        autoplayDelay={10000}
        className="overflow-hidden"
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
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 wull">
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
      >
        {images?.map((img: string, i: number) => (
          <div
            key={i}
            className={`flex ${
              zoom && `items-center`
            } justify-center overflow-hidden `}
          >
            <Image
              priority
              width={!zoom ? 300 : 768}
              height={!zoom ? 200 : 320}
              src={img}
              alt={selectedProduct.name}
              onLoad={() => <Loading />}
              className={`max-w-3xl pb-20 object-cover md:transition-all ${
                !zoom
                  ? "md:h-80 hover:cursor-zoom-in pointer-events-none md:pointer-events-auto"
                  : "hover:cursor-zoom-out"
              }`}
              onClick={() => setZoom(!zoom)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagesProduct;
