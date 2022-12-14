import React from "react";
import style from "./About.module.css";
import img from "../../assets/trabajos/IMG-20221213-WA0003.jpg";

export default function About({ about }) {
  return (
    <section className={style.body} ref={about}>
      <div className={style.fondo}>
        <div className={style.container}>
          <h1>
            Sobre
            <span> nosotros</span>
          </h1>

          <h6>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum,
            praesentium molestiae incidunt nostrum pariatur fuga dolore ipsa?
            Nostrum facilis dicta laudantium, minima tenetur soluta ullam.
            Corporis a debitis ea aliquam? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quis magni labore impedit debitis
            voluptates, repellat deserunt quisquam beatae eum eius, accusamus
            maiores cum nemo laborum. Expedita omnis nulla optio ex. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Harum, praesentium
            molestiae incidunt nostrum pariatur fuga dolore ipsa? Nostrum
            facilis dicta laudantium, minima tenetur soluta ullam. Corporis a
            debitis ea aliquam? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quis magni labore impedit debitis voluptates,
            repellat deserunt quisquam beatae eum eius, accusamus maiores cum
            nemo laborum. Expedita omnis nulla optio ex.
          </h6>
          {/* <img className={style.imgAbout} src={img} alt="" /> */}
        </div>
      </div>
    </section>
  );
}
