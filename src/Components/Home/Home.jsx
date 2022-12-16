import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Carrousel from "../Carrousel/Carrousel";
import NavBar from "../NavBar/NavBar";
import style from "./Home.module.css";

export default function Home({ inicio, about }) {
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
              className={style.buttonHome}
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
