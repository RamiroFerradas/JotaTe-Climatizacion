// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Grid } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import product1 from "../../assets/Productos destacados/BASE S 6.PNG";
import product4 from "../../assets/Productos destacados/DISCO ASAPARRI 3.jpg";
// import product2 from "../../assets/Productos destacados/brasero de pie asaparri 4.JPG";
// import product3 from "../../assets/Productos destacados/IMG_4139.JPG";
import product5 from "../../assets/Productos destacados/IMG_0476_Facetune_15-10-2020-10-52-07.jpg";
import product6 from "../../assets/Productos destacados/IMG_5185_Facetune_23-09-2021-16-21-23.jpg";
// import product7 from "../../assets/Productos destacados/TABLITA.png";
import product8 from "../../assets/Productos destacados/salamandras-08.jpg";

export default function Destacados({ destacados }) {
  return (
    <Swiper
      slidesPerView={3}
      grid={{
        rows: 2,
      }}
      spaceBetween={30}
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Grid]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
      ...
    </Swiper>
  );
}
