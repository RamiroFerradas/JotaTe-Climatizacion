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
  console.log(linkActive);
  return (
    <Navbar bg="secondary" variant="dark">
      <Container className=" d-flex justify-content-center align-items-center ">
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Nav className="">
          {links.map(({ value, id, active }) => (
            <Nav.Link
              onClick={() => setLinkActive(active)}
              id={id}
              className={`me-4  ${linkActive === value && style.linkActive}`}
            >
              {value}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}
