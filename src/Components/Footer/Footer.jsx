import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <section>
      <Container className={`${styles.body}`}></Container>
    </section>
  );
}
