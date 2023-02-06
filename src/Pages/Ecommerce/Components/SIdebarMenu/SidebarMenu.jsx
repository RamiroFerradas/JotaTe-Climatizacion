import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Filters from "./Filters/Filters";
import Orders from "./Orders/Orders";
import s from "./SidebarStyles.module.css";

export default function SidebarMenu() {
  return (
    <Container className={s.body}>
      <Row>
        <Col>
          <Orders />
        </Col>
        <Col>
          <Filters />
        </Col>
      </Row>
    </Container>
  );
}
