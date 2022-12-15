// import Swiper core and required modules
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

export default function Destacados({ destacados }) {
  return (
    <section ref={destacados} className={styles.body}>
      <div className={styles.container}>
        <h2>
          Productos <span>destacados</span>
        </h2>
      </div>

      <Swiper
        breakpoints={{
          // when window width is >= 640px
          440: {
            width: 440,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
          900: {
            width: 900,
            slidesPerView: 3,
          },
        }}
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
        // className="mySwiper"
      >
        {productos?.map((e, index) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() => console.log("clickProduct")}
              className={styles.Swipper}
            >
              <p>{e.name}</p>
              <img src={e.item} alt="asparri" className={styles.imgs} />
              <p>${e.price}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
