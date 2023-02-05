import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import style from "./CategoriesNav.module.css";
export default function CategoriesNav() {
  const links = [
    { id: 1, value: "Climatizacion", active: "Climatizacion" },
    { id: 2, value: "Utensillos" },
    { id: 3, value: "Parrilleros" },
    { id: 4, value: "Estufas" },
    { id: 5, value: "Termotanques" },
    { id: 6, value: "Servicios" },
  ];
  const [linkActive, setLinkActive] = useState("Climatizacion");

  return (
    <Navbar className={style.body} variant="dark">
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Nav className={style.nav}>
          {links.map(({ value, id }) => (
            <Nav.Link
              className={`me- ${style.nav}`}
              onClick={() => setLinkActive(value)}
              id={id}
            >
              <span
                className={`${
                  value === linkActive ? style.linkActive : style.noActive
                }`}
              >
                {value}
              </span>
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}
