import SwipperProducts from "./SwipperProducts";
import styles from "./Destacados.module.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function Destacados({ destacados }) {
  const navigate = useNavigate();
  return (
    <section ref={destacados} className={styles.body} id="destacados">
      <div className={styles.container}>
        <h2>
          Productos <span>destacados</span>
        </h2>
      </div>
      <SwipperProducts />
      <button
        className={styles.buttonBeginning}
        onClick={() => navigate("/shop")}
      >
        <span>Ver todos los productos</span>
      </button>
    </section>
  );
}
