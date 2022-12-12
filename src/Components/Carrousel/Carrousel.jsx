import React from "react";
import { Carousel } from "react-bootstrap";
import style from "./Carrousel.module.css";
import img1 from "../../assets/logotipo-20221208T001432Z-001/logotipo/fondo sólido/Jotaté logotipo circular fondo blanco.png";
import img2 from "../../assets/logotipo-20221208T001432Z-001/logotipo/fondo sólido/Jotaté logotipo circular fondo naranja.png";
import img3 from "../../assets/logotipo-20221208T001432Z-001/logotipo/fondo sólido/Jotaté logotipo circular fondo turquesa.png";
import useScreenSize from "../../Hooks/useScreenSize";

export default function Carrousel() {
  const { height, width } = useScreenSize();

  console.log(height, width);
  return (
    <div className={style.body}>
      <Carousel interval="3000" fade keyboard touch>
        <Carousel.Item>
          <div className={style.imgCarrousel}>
            <img className={`d-block w-100 `} src={img1} alt="Blanco" />
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={style.imgCarrousel}>
            <img className={`d-block w-100 `} src={img2} alt="Naranja" />
          </div>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={style.imgCarrousel}>
            <img className={`d-block w-100 `} src={img3} alt="Turquesa" />
          </div>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
