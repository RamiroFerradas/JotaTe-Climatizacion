import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../../../assets/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import style from "./NavBar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalStorage } from "../../../../Hooks/useLocalStorage";

import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

export default function NavBar({ inicio, about, servicios, destacados }) {
  const [scroll, setScroll] = useState(false);
  const link = useRef();

  const navBarRef = useRef();
  const scrollToSeccion = (elementRef) => {
    window.scrollTo({
      top: navBarRef
        ? elementRef.current.offsetTop - navBarRef.current?.clientHeight
        : elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  const [sectionActive, setsectionActive] = useLocalStorage(
    "section",
    "Beginning"
  );

  const handleScroll = useCallback(() => {
    let current = "";
    const section = document.querySelectorAll(`section`);
    section.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
        setsectionActive(current);
        // console.log("estas en", current);
      }
    });
  }, [setsectionActive]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      var nav = document.querySelector("nav");
      nav.classList?.toggle(style.sticky, window.scrollY > 0);
      window.addEventListener("scroll", handleScroll);
    });
  }, [handleScroll]);

  const values = [
    {
      id: 1,
      active: "inicio",
      text: `Inicio`,
      scrollTo: inicio,
      ref: link,
      href: "#inicio",
    },
    {
      id: 2,
      active: "Acerca de",
      text: `Sobre nosotros`,
      href: "#Acerca_de",
      scrollTo: about,
      ref: link,
    },
    {
      id: 3,
      active: "servicios",
      text: `Servicios`,
      href: "#servicios",
      ref: link,
      scrollTo: servicios,
    },
    {
      id: 4,
      active: "destacados",
      text: `Destacados`,
      href: "#destacados",
      ref: link,
      scrollTo: destacados,
    },
  ];
  const expand = "lg";
  const img = (
    <img className={style.imgLogo} src={logo} alt="jotaTeClimatizacion" />
  );
  return (
    <>
      <Navbar
        ref={navBarRef}
        fixed={"top"}
        expand="lg"
        variant="light"
        className={`d-flex justify-content-around" ${style.navbar}`}
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
                    <Nav.Link
                      key={e.id}
                      className="me-5"
                      onClick={() => scrollToSeccion(e.scrollTo)}
                    >
                      <p
                        className={
                          e.active === sectionActive
                            ? style.textNavActive
                            : style.noActive
                        }
                      >
                        {e.text}
                      </p>
                    </Nav.Link>
                  );
                })}
              </Nav>
              <NavDropdown
                className="d-flex pe-5"
                title="Productos"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item href="#action1">Utensillos</NavDropdown.Item>
                <NavDropdown.Item href="#action2">Parrillas</NavDropdown.Item>
                <NavDropdown.Item href="#action3">
                  Termotanques
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">Estufas</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="#action5"
                  onClick={() => scrollToSeccion(servicios)}
                >
                  Servicios
                </NavDropdown.Item>
              </NavDropdown>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
