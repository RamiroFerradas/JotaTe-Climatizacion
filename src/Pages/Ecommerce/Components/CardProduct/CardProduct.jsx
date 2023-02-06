import { Button, Card } from "react-bootstrap";
import React from "react";
import style from "./CardProduct.module.css";

export default function CardProduct({ price, title, descricion, img }) {
  return (
    <Card className="text-center">
      <Card.Img variant="top" src={img} className={style.img} />
      <Card.Body>
        <Card.Title>
          <p className="h6">{title}</p>
        </Card.Title>
        <Card.Text>
          <small className="text-center h5 text-muted">${price}</small>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="outline-success">
          <span className="">AGREGAR AL CARRITO</span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
