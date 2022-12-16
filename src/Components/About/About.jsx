import React from "react";
import style from "./About.module.css";
import img from "../../assets/trabajos/IMG-20221213-WA0003.jpg";
import { Col, Container, Row } from "react-bootstrap";

export default function About({ about }) {
  return (
    <section className={style.body} ref={about} id="Acerca de">
      <Container>
        <div className={style.container}>
          <Row className="d-flex align-items-center p-4">
            <Col lg={6}>
              <h1>
                Sobre
                <span> nosotros</span>
              </h1>
            </Col>

            <Col lg={6}>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum,
                praesentium molestiae incidunt nostrum pariatur fuga dolore
                ipsa? Nostrum facilis dicta laudantium, minima tenetur soluta
                ullam. Corporis a debitis ea aliquam? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quis magni labore impedit debitis
                voluptates, repellat deserunt quisquam beatae eum eius,
                accusamus maiores cum nemo laborum. Expedita omnis nulla optio
                ex. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Harum, praesentium molestiae incidunt nostrum pariatur fuga
                dolore ipsa? Nostrum facilis dicta laudantium, minima tenetur
                soluta ullam. Corporis a debitis ea aliquam? Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Quis magni labore impedit
                debitis voluptates, repellat deserunt quisquam beatae eum eius,
                accusamus maiores cum nemo laborum. Expedita omnis nulla optio
                ex.
              </p>
            </Col>

            {/* <img className={style.imgAbout} src={img} alt="" /> */}
          </Row>
        </div>
      </Container>
    </section>
  );
}
