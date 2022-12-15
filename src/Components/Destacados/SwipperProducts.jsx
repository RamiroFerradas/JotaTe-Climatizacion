import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Grid,
  EffectFade,
  Mousewheel,
  EffectFlip,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./Destacados.module.css";
SwiperCore.use([Autoplay]);

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";

import Products from "./Products";

const { productos } = Products();

export default function SwipperProducts() {
  return (
    <>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        navigation={true}
        EffectFlip={true}
        mousewheel={true}
        keyboard={true}
        slidesPerView={3}
        grid={{
          rows: 1,
          // fill={"row"}
        }}
        spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[
          Grid,
          Pagination,
          EffectFade,
          Mousewheel,
          Navigation,
          EffectFlip,
          Autoplay,
        ]}
        breakpoints={{
          // when window width is >= 640px
          300: {
            width: 300,
            slidesPerView: 1,
          },
          400: {
            width: 400,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
          1300: {
            width: 1300,
            slidesPerView: 3,
          },
        }}
        // className="mySwiper"
      >
        {productos?.map((e, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() => console.log("clickProduct")}
              className={styles.Swipper}
            >
              <p className="fs-5 text text-uppercase">{e.name}</p>
              <img src={e.item} alt="asparri" className={styles.imgs} />
              <p className={`fw-bolder fs-4 ${styles.price}`}>${e.price}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
