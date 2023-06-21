import { Loading } from "@/app/components";
import { Product } from "@/app/models";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import ReactImageZoom from "react-image-zoom";

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
      className={`flex items-center flex-col md:flex-row h-96 justify-center max-w-2xl ${
        zoom ? `md:h-screen ` : `md:h-56 overflow-hidden`
      }`}
    >
      <Carousel
        loop
        autoplay
        autoplayDelay={10000}
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
        {images?.map((img: string, i: number) => {
          const props = {
            width: 300,
            height: 300,
            zoomWidth: 800,
            zoomHeight: 800,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            img: img,
            zoomPosition: "original",
          };

          return (
            <div className="flex w-full h-full justify-center items-center">
              {/* <ReactImageZoom
                {...props}
                className={`rounded-xl max-w-2xl object-contain transition-all ${
                  !zoom ? "h-60 hover:cursor-zoom-in" : "hover:cursor-zoom-out"
                }`}
                onClick={() => setZoom(!zoom)}
              /> */}
              <Image
                priority
                width={1000}
                height={1000}
                src={img}
                alt={selectedProduct.name}
                onLoad={() => <Loading />}
                className={`p-8 max-w-3xl object-contain md:transition-all ${
                  !zoom
                    ? "h-[100vh md:h-80 hover:cursor-zoom-in"
                    : "hover:cursor-zoom-out"
                }`}
                onClick={() => setZoom(!zoom)}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImagesProduct;
{
  /* <Image
              priority
              width={350}
              height={200}
              src={img}
              alt={selectedProduct.name}
              className="rounded-xl max-w-2xl object-contain h-60"
            /> */
}

// <div
//   key={i}
//   className="flex flex-col items-center justify-center overflow-hidde h-full w-full"
// >
//   <div
//     className="w-56 h-full flex justify-center items-center flex-row"
//     id="magnify"
//   >
//     <ReactImageMagnify
//       {...{
//         smallImage: {
//           alt: "Wristwatch by Ted Baker London",
//           isFluidWidth: true,
//           src: img,
//           width: 400,
//           height: 800,
//         },
//         largeImage: {
//           src: img,
//           width: 300,
//           height: 600,
//         },

//         isHintEnabled: true,

//         hintComponent: customHintComponent,
//         enlargedImagePosition: "over",
//         enlargedImageContainerDimensions: {
//           width: "100%",
//           height: "100%",
//         },
//       }}
//     />
//   </div>
// </div>
// <div
//   key={i}
//   className="flex flex-col items-center justify-center overflow-hidde h-40 w-52"
// >
