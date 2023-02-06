import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Footer.moudule.css";

export default function Footer() {
  return (
    <div
      fluid
      className={`d-flex justify-content-center align-items-center text-light bg-dark pt-2 `}
    >
      <p>
        {`© Copyright Jota Te Climatizacion. All Rights Reserved Designed by `}
        <a
          style={{ textDecoration: "none" }}
          href="https://www.linkedin.com/in/ramiro-ferradas/"
          target="_blank"
          rel="noreferrer"
        >
          Ramiro Ferradas
        </a>
      </p>
    </div>
  );
}
