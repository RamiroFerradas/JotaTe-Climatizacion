import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../../assets/logotipo-20221208T001432Z-001/logotipo/fondo sólido/Jotaté logotipo circular fondo blanco.png";
import img2 from "../../assets/logotipo-20221208T001432Z-001/logotipo/fondo sólido/Jotaté logotipo circular fondo naranja.png";
import img3 from "../../assets/logotipo-20221208T001432Z-001/logotipo/fondo sólido/Jotaté logotipo circular fondo turquesa.png";

export default function Carrousel() {
  return (
    <div>
      <Carousel interval="3000" fade keyboard touch>
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="Blanco" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="Naranja" />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Turquesa" />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
