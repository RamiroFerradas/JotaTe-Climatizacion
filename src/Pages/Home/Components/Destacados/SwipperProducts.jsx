import SwiperCore, {
  Navigation,
  Pagination,
  Grid,
  EffectFade,
  Mousewheel,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./Destacados.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import { productos } from "../../../../Products";

SwiperCore.use([Autoplay]);
export default function SwipperProducts() {
  return (
    <>
      <Swiper
        className={styles.Swipper}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        preloadImages
        grabCursor
        navigation={true}
        mousewheel={true}
        keyboard={true}
        // slidesPerView={"3"}
        grid={{
          rows: 1,
          // fill={"row"}
        }}
        // spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[
          Grid,

          Pagination,
          EffectFade,
          Mousewheel,
          Navigation,
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
      >
        {productos?.map(({ name, item, price }, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() => console.log("clickProduct")}
              className={styles.SwipperSlide}
            >
              <p className="fs-5 text text-uppercase">{name}</p>
              <img src={item} alt="asparri" className={styles.imgs} />
              <p className={`fw-bolder fs-4 ${styles.price}`}>${price}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
