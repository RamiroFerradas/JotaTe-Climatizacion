import SwipperProducts from "./SwipperProducts";
import styles from "./Destacados.module.css";

export default function Destacados({ destacados }) {
  return (
    <section ref={destacados} className={styles.body}>
      <div className={styles.container}>
        <h2>
          Productos <span>destacados</span>
        </h2>
      </div>
      <SwipperProducts />
      <button
        className={styles.buttonHome}
        onClick={() => console.log("clickProduct")}
      >
        <span>Ver todos los productos</span>
      </button>
    </section>
  );
}
