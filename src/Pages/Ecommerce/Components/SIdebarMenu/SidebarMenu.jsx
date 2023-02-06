import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Filters from "./Filters/Filters";
import Orders from "./Orders/Orders";
import style from "./SidebarMenu.module.css";

export default function SidebarMenu() {
  return (
    <Row className={style.body}>
      <Col>
        <Orders />
      </Col>
      <Col>
        <Filters />
      </Col>
    </Row>
  );
}
