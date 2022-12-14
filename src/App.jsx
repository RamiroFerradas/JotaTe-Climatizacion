import Home from "./Components/Home/Home";
import style from "./App.module.css";
import NavBar from "./Components/NavBar/NavBar";
import About from "./Components/About/About";
import { useRef } from "react";

function App() {
  const about = useRef();
  const inicio = useRef();
  return (
    <div className={style.app}>
      <NavBar inicio={inicio} about={about} />
      <section>
        <Home inicio={inicio} />
        <About about={about} />
      </section>
    </div>
  );
}

export default App;
