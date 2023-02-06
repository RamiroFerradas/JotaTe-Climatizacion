import React from "react";
import { Col, Row } from "react-bootstrap";
import { productos } from "../../../Home/Components/Destacados/Products";
import CardProduct from "./CardProduct/CardProduct";

export default function ProductsGrid() {
  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4">
        {productos.map(({ item, name, price, descricion }, i) => (
          <Col key={i}>
            <CardProduct
              img={item}
              price={price}
              title={name}
              descricion={descricion}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
