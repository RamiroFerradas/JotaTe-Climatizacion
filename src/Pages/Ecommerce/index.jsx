import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useScreenSize from "../../Hooks/useScreenSize";
import CategoriesNav from "./Components/ProducsGrid/CategoriesNav/CategoriesNav";
import NavBar from "./Components/NavBar/NavBar";
import style from "./index.module.css";
import ProductsGrid from "./Components/ProducsGrid/ProducsGrid";
import SidebarMenu from "./Components/SIdebarMenu/SidebarMenu";
import Footer from "./Components/Footer/Footer";

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
              <SidebarMenu />
            </Col>
          )}
          <Col sm={width >= 768 ? 9 : 12}>
            <ProductsGrid />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
