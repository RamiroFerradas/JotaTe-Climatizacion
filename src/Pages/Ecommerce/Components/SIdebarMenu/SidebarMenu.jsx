import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Filters from "./Filters/Filters";
import Orders from "./Orders/Orders";
import s from "./SidebarStyles.module.css";

export default function SidebarMenu() {
  return (
    <Row>
      <Container className={s.body}>
        <Col>
          <Orders />
        </Col>
        <Col>
          <Filters />
        </Col>
      </Container>
    </Row>
  );
}
