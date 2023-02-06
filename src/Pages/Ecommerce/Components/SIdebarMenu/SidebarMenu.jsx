import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Filters from "./Filters/Filters";
import Orders from "./Orders/Orders";

export default function SidebarMenu() {
  return (
    <Row>
      <Col>
        <Orders />
      </Col>
      <Col>
        <Filters />
      </Col>
    </Row>
  );
}
