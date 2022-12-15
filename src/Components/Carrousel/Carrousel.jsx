import React from "react";
import { Carousel } from "react-bootstrap";
import style from "./Carrousel.module.css";

import img1 from "../../assets/trabajos/IMG-20221213-WA0003.jpg";
import img2 from "../../assets/trabajos/IMG-20221213-WA0005.jpg";
import img3 from "../../assets/trabajos/IMG-20221213-WA0006.jpg";
import img4 from "../../assets/trabajos/IMG-20221213-WA0008.jpg";
import img5 from "../../assets/trabajos/IMG-20221213-WA0009.jpg";
import useScreenSize from "../../Hooks/useScreenSize";

const imgArr = [
  { src: img1, alt: "jotaTeClimatizacion" },
  { src: img2, alt: "jotaTeClimatizacion" },
  { src: img3, alt: "jotaTeClimatizacion" },
  { src: img4, alt: "jotaTeClimatizacion" },
  { src: img5, alt: "jotaTeClimatizacion" },
];

export default function Carrousel() {
  const { height, width } = useScreenSize();

  return (
    <div className={style.body}>
      <Carousel
        interval="3000"
        fade
        keyboard
        touch
        // controls={false}
        // indicators={false}
        className={style.carr}
      >
        {imgArr?.map((e, index) => {
          return (
            <Carousel.Item key={index}>
              <div className={style.imgCarrousel}>
                <img
                  className={`d-block w-100 ${style.imgCarrousel}`}
                  src={e.src}
                  alt={e.alt}
                />
              </div>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
