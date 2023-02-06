import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../../../assets/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import style from "./NavBar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalStorage } from "../../../../Hooks/useLocalStorage";

import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import useScreenSize from "../../../../Hooks/useScreenSize";

export default function NavBar({ inicio, about, servicios, destacados }) {
  const refBodyCanvas = useRef();
  const { width } = useScreenSize();
  const categories = [
    { id: 1, text: "Climatizacion" },
    { id: 2, text: "Utensillos" },
    { id: 3, text: "Parrilleros" },
    { id: 4, text: "Estufas" },
    { id: 5, text: "Termotanques" },
    { id: 6, text: "Servicios" },
  ];

  const expand = "md";
  const img = (
    <img className={style.imgLogo} src={logo} alt="jotaTeClimatizacion" />
  );
  return (
    <Container>
      <Navbar key={expand} bg="light" expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/">{img}</Navbar.Brand>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              ref={refBodyCanvas}
              className={
                width >= 768 &&
                `d-flex justify-content-between align-items-center`
              }
            >
              <div></div>
              <Form className="d-flex justify-content-center">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className={`me-2 ${width >= 768 && style.searchbar}`}
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav className="flex-row justify-content-around align-items-center mt-2">
                <Nav.Link href="#action1">
                  <div className="flex-column d-flex justify-content-center align-items-center mt-2 me-3">
                    <svg
                      width="22"
                      height="20"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 11.5C6.6625 11.5 0 13.175 0 16.5V17.75C0 18.4375 0.5625 19 1.25 19H18.75C19.4375 19 20 18.4375 20 17.75V16.5C20 13.175 13.3375 11.5 10 11.5Z"
                        fill="#8B96A5"
                      />
                    </svg>

                    <p>Perfil</p>
                  </div>
                </Nav.Link>

                <Nav.Link href="#action2">
                  <div className="flex-column d-flex justify-content-center align-items-center mt-2">
                    <svg
                      width="22"
                      height="19"
                      viewBox="0 0 22 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.35 17.1302C11.59 17.8202 10.42 17.8202 9.66003 17.1202L9.55003 17.0202C4.30003 12.2702 0.870031 9.16017 1.00003 5.28017C1.06003 3.58017 1.93003 1.95017 3.34003 0.990166C5.98003 -0.809834 9.24003 0.0301659 11 2.09017C12.76 0.0301659 16.02 -0.819834 18.66 0.990166C20.07 1.95017 20.94 3.58017 21 5.28017C21.14 9.16017 17.7 12.2702 12.45 17.0402L12.35 17.1302Z"
                        fill="#8B96A5"
                      />
                    </svg>

                    <p>Favoritos</p>
                  </div>
                </Nav.Link>

                <Nav.Link href="#action2">
                  <div className="flex-column d-flex justify-content-center align-items-center mt-2">
                    <svg
                      width="22"
                      height="19"
                      viewBox="0 0 22 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.29989 16.7997C5.14491 16.7997 4.21043 17.7447 4.21043 18.8997C4.21043 20.0546 5.14491 20.9996 6.29989 20.9996C7.45487 20.9996 8.39985 20.0546 8.39985 18.8997C8.39985 17.7447 7.45487 16.7997 6.29989 16.7997ZM0 1.04998C0 1.62747 0.472492 2.09996 1.04998 2.09996H2.09996L5.8799 10.0693L4.46242 12.6313C3.69593 14.0383 4.70392 15.7497 6.29989 15.7497H17.8497C18.4272 15.7497 18.8997 15.2772 18.8997 14.6997C18.8997 14.1223 18.4272 13.6498 17.8497 13.6498H6.29989L7.45487 11.5498H15.2772C16.0647 11.5498 16.7577 11.1193 17.1147 10.4683L20.8736 3.65394C21.2621 2.96095 20.7581 2.09996 19.9601 2.09996H4.42042L3.71693 0.598489C3.54894 0.230996 3.17094 0 2.77195 0H1.04998C0.472492 0 0 0.472492 0 1.04998ZM16.7997 16.7997C15.6447 16.7997 14.7102 17.7447 14.7102 18.8997C14.7102 20.0546 15.6447 20.9996 16.7997 20.9996C17.9547 20.9996 18.8997 20.0546 18.8997 18.8997C18.8997 17.7447 17.9547 16.7997 16.7997 16.7997Z"
                        fill="#8B96A5"
                      />
                    </svg>

                    <p>Carrito</p>
                  </div>
                </Nav.Link>
              </Nav>
              {width < 768 ? (
                <NavDropdown
                  title="Categorias"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  {categories.map(({ text, id }) => (
                    <NavDropdown.Item
                      className={style.dropdownItem}
                      href="#action3"
                      key={id}
                    >
                      {text}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : null}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Container>
  );
}
