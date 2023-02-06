import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./SidebarMenu.module.css";
import Filters from "./Filters/Filters";
import Orders from "./Orders/Orders";

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
