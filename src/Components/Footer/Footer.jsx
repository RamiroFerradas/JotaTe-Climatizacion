import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Footer.module.css";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
export default function Footer() {
  return (
    <section>
      <Container
        fluid
        className={`d-flex justify-content-center ali text-light ${styles.body1}`}
      >
        <BsInstagram />
        <BsWhatsapp />
        <BiPhoneCall />
        <BiMailSend />
      </Container>
      <Container
        fluid
        className={`d-flex justify-content-center text-light ${styles.body2}`}
      >
        <p>© 2020 Copyright: MDBootstrap.com</p>
      </Container>
    </section>
  );
}
