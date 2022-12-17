import React from "react";
import style from "./About.module.css";
import img from "../../assets/trabajos/IMG-20221213-WA0003.jpg";
import { Col, Container, Row } from "react-bootstrap";

export default function About({ about }) {
  return (
    <section className={style.body} ref={about} id="Acerca de">
      <Container>
        <div className={style.container}>
          <Row className="d-flex align-items-center p-4">
            <Col lg={6}>
              <h1>
                Sobre
                <span> nosotros</span>
              </h1>
            </Col>

            <Col lg={6} className=" p-5 d-inline-block">
              <p>
                Somos una empresa joven y familiar donde nuestros comienzos
                fueron en el rubro de Climatizacion en general, en la actualidad
                pudimos expandirnos en nuevos horizontes y ampliando amplios
                sectores del rubro. Hoy en dia, en efecto de un gran esfuerzo de
                los ultimos años pudimos instalar nuestra primera sucursal en la
                ciudad de Rafaela, Santa Fe. Donde pudimos expandir nuestra gama
                de servicios y productos.
              </p>
            </Col>

            {/* <img className={style.imgAbout} src={img} alt="" /> */}
          </Row>
        </div>
      </Container>
    </section>
  );
}
