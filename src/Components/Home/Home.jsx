import React from "react";
import NavBar from "../NavBar/NavBar";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className={style.body}>
      <NavBar />
      <div className={style.container}>
        <div>
          <h1>We create yourspace better</h1>
          <h3>
            Our team creates comfortable spaces for our clients. We’ve been
            designing your everyday life and work through great ideas since
            1999.
          </h3>
        </div>
      </div>
    </div>
  );
}
