import React, { useRef } from "react";
import Inicio from "./Components/Inicio/Inicio";
import Destacados from "./Components/Destacados/Destacados";
import NavBar from "./Components/NavBar/NavBar";
import Servicios from "./Components/Servicios/Servicios";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";

export default function Home() {
  const about = useRef();
  const inicio = useRef();
  const servicios = useRef();
  const destacados = useRef();

  return (
    <>
      <NavBar
        inicio={inicio}
        about={about}
        servicios={servicios}
        destacados={destacados}
      />
      <section>
        <Inicio inicio={inicio} about={about} />
        <About about={about} />
        <Servicios servicios={servicios} />
        <Destacados destacados={destacados} />
        <Footer />
      </section>
    </>
  );
}
