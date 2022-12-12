import React from "react";
import { Button } from "react-bootstrap";
import Carrousel from "../Carrousel/Carrousel";
import NavBar from "../NavBar/NavBar";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style.body}>
      <div className={style.container}>
        <div>
          <h1 className="display-3">Climatización Ecológica</h1>
          <h6>
            Nos dedicamos a la venta e instalación de termotanques solares,
            estufas a pellets, parrilleros, salamandras a leña, entre otros...
          </h6>
          <button className={style.buttonHome}>
            <span>Conoce mas</span>
          </button>
        </div>
        <Carrousel />
      </div>
      <div className={style.carrousel}></div>
    </div>
  );
}
