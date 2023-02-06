import { Card } from "react-bootstrap";
import React from "react";
import style from "./CardProduct.module.css";

export default function CardProduct({ price, title, descricion, img }) {
  return (
    <Card>
      <Card.Img variant="top" src={img} className={style.img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{descricion}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="h4 text-muted">{price}</small>
      </Card.Footer>
    </Card>
  );
}
