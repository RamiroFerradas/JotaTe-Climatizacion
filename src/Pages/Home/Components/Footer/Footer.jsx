import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Footer.module.css";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
export default function Footer() {
  return (
    <section>
      <Container
        fluid
        className={`d-flex justify-content-center ali text-light  ${styles.body1}`}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/jotate.climatizacion/"
          className={styles.insta}
        >
          <BsInstagram />
        </a>
        <a
          target="_blank"
          href="https://api.whatsapp.com/send?phone=5493492410583"
          rel="noreferrer"
          className={styles.wpp}
        >
          <BsWhatsapp />
        </a>

        <a
          href="tel:+5493492410583"
          target="_blank"
          rel="noreferrer"
          className={styles.cel}
        >
          <BiPhoneCall />
        </a>
        <a
          href="mailto:cuenta@deemail.com"
          target="_blank"
          rel="noreferrer"
          className={styles.mail}
        >
          <BiMailSend />
        </a>
        <a
          href="https://goo.gl/maps/XycV1fvGLQwo2VWVA"
          target="_blank"
          rel="noreferrer"
          className={styles.location}
        >
          <GoLocation />
        </a>
      </Container>
      <Container
        fluid
        className={`d-flex justify-content-center align-items-center text-light ${styles.body2}`}
      >
        <p>© 2022 Copyright: Desing by Ramiro Ferradas</p>
      </Container>
    </section>
  );
}
