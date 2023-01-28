import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Carrousel from "../Carrousel/Carrousel";
import style from "./Inicio.module.css";

export default function Inicio({ inicio, about }) {
  const scrollToSeccion = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };
  return (
    <section ref={inicio} className={style.body} id="inicio">
      <Container fluid className="p-5">
        <Row>
          <Col md={6}>
            <h1 className="display-3">Climatización Ecológica</h1>
            <p>
              Nos dedicamos a la venta e instalación de termotanques solares,
              estufas a pellets, parrilleros, salamandras a leña, entre otros...
            </p>
            <br />
            <button
              className={style.buttonBeginning}
              onClick={() => scrollToSeccion(about)}
            >
              <span>Conoce mas</span>
            </button>
          </Col>
          <Col md={6}>
            <Carrousel />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
