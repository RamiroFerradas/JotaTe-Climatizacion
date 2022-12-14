import { useRef } from "react";
import Home from "./Components/Home/Home";
import style from "./App.module.css";
import NavBar from "./Components/NavBar/NavBar";
import About from "./Components/About/About";
import Servicios from "./Components/Servicios/Servicios";
import Destacados from "./Components/Destacados/Destacados";
import Footer from "./Components/Footer/Footer";

function App() {
  const about = useRef();
  const inicio = useRef();
  const servicios = useRef();
  const destacados = useRef();

  return (
    <div className={style.app}>
      <NavBar
        inicio={inicio}
        about={about}
        servicios={servicios}
        destacados={destacados}
      />
      <section>
        <Home inicio={inicio} about={about} />
        <About about={about} />
        <Servicios servicios={servicios} />
        <Destacados destacados={destacados} />
        <Footer />
      </section>
    </div>
  );
}

export default App;
