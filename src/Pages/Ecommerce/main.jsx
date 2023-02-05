import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../Hooks/useScreenSize";
import CategoriesNav from "./Components/CategoriesNav/CategoriesNav";
import Filtros from "./Components/Filtros/Filtros";
import NavBar from "./Components/NavBar/NavBar";
import Productos from "./Components/Productos/Productos";
import style from "./main.module.css";

export default function Ecommerce() {
  const { width } = useScreenSize();

  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      {width >= 768 ? <CategoriesNav /> : null}
      <Container fluid className={`p-5  ${style.body}`}>
        <Row>
          {width >= 768 && (
            <Col sm={3}>
              <Filtros />
            </Col>
          )}
          <Col sm={width >= 768 ? 9 : 12}>
            <Productos />
          </Col>
        </Row>
      </Container>
    </>
  );
}