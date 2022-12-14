import React from "react";
import styles from "./Servicios.module.css";
import { MdPool } from "react-icons/md";
import { GiWaterTank, GiThermometerCold } from "react-icons/gi";

export default function Servicios({ servicios }) {
  const services = [
    {
      title: "Termotanques solares",
      description: "Venta e Instalacion de termotanques solares",
      img: <GiWaterTank />,
    },
    {
      title: "Piscinas",
      description: "Climatizacion de piscinas",
      img: <MdPool />,
    },
    {
      title: "Aires Acondicionados",
      description: "Instalacion de aires acondicionados",
      img: <GiThermometerCold />,
    },
  ];

  return (
    <section ref={servicios} className={styles.body}>
      <div>
        <div className={styles.container}>
          <h2>
            Nuestros <span>servicios</span>
          </h2>
          <div className={styles.services}>
            {services?.map((e, index) => {
              return (
                <div key={index}>
                  <span className={styles.img}>{e.img}</span>
                  <h3>{e.title?.toUpperCase()}</h3>
                  <p className={styles.description}>{e.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
