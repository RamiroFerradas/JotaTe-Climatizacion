import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useScreenSize from "../../Hooks/useScreenSize";
import CategoriesNav from "./Components/CategoriesNav/CategoriesNav";
import Filtros from "./Components/Filtros/Filtros";
import NavBar from "./Components/NavBar/NavBar";
import style from "./index.module.css";
import ProductsGrid from "./ProducsGrid/ProducsGrid";

export default function Ecommerce() {
  const { width } = useScreenSize();

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
            <ProductsGrid />
          </Col>
        </Row>
      </Container>
    </>
  );
}
