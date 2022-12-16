import React from "react";
import styles from "./Servicios.module.css";
import { MdPool } from "react-icons/md";
import { GiWaterTank, GiThermometerCold } from "react-icons/gi";
import { Col, Row } from "react-bootstrap";

export default function Servicios({ servicios }) {
  const services = [
    {
      title: "Termotanques solares",
      description: "Venta, Instalacion y mantenimiento de termotanques solares",
      img: <GiWaterTank />,
    },
    {
      title: "Piscinas",
      description: "Climatizacion y mantenimiento de piscinas",
      img: <MdPool />,
    },
    {
      title: "Aires Acondicionados",
      description: "Instalacion de aires acondicionados",
      img: <GiThermometerCold />,
    },
  ];

  return (
    <section ref={servicios} className={styles.body} id="servicios">
      <div className={styles.container}>
        <h2>
          Nuestros <span>servicios</span>
        </h2>
        <div className={styles.services}>
          <Row>
            {services?.map((e, index) => {
              return (
                <Col key={index} className="g-3 p-5">
                  <span className={styles.img}>{e.img}</span>
                  <h3 className="text-uppercase">{e.title}</h3>
                  <p className={styles.description}>{e.description}</p>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </section>
  );
}
