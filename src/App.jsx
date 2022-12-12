import Home from "./Components/Home/Home";
import style from "./App.module.css";
import NavBar from "./Components/NavBar/NavBar";
import About from "./Components/About/About";

function App() {
  return (
    <div className={style.app}>
      <NavBar />
      <section>
        <Home />
        <About />
      </section>
    </div>
  );
}

export default App;
