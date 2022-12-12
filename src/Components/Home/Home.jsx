import React from "react";
import Carrousel from "../Carrousel/Carrousel";
import NavBar from "../NavBar/NavBar";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style.body}>
      <NavBar />
      <div className={style.container}>
        <div>
          <h1>Climatización Ecológica</h1>
          <h3>
            Nos dedicamos a la venta e instalación de termotanques solares
          </h3>
        </div>
        <Carrousel />
      </div>
    </div>
  );
}
