import React, { useRef, useState } from "react";
import logo from "../../assets/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import style from "./NavBar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
export default function NavBar({ inicio, about, servicios }) {
  const link = useRef();

  const values = [
    {
      id: 1,
      active: "home",
      text: `home`,
      scrollTo: inicio,
      ref: link,
      href: "#home",
    },
    {
      id: 2,
      active: "about",
      text: `about`,
      href: "#about",
      scrollTo: about,
      ref: link,
    },
    {
      id: 3,
      active: "services",
      text: `services`,
      href: "#services",
      ref: link,
      scrollTo: servicios,
    },
  ];

  const [sectionActive, setsectionActive] = useState("home");
  const expand = "lg";
  const img = (
    <img className={style.imgLogo} src={logo} alt="jotaTeClimatizacion" />
  );
  return (
    <div>
      <Navbar
        bg="light"
        sticky="top"
        expand="lg"
        variant="light"
        className="d-flex justify-content-around"
      >
        <Container>
          <Navbar.Brand href="#">{img}</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                {img}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 ">
                {values.map((e) => {
                  return (
                    <Nav.Link className="me-5" href={e.href}>
                      {e.text}
                    </Nav.Link>
                  );
                })}
              </Nav>
              <NavDropdown
                className="d-flex pe-5"
                title="Dropdown"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
