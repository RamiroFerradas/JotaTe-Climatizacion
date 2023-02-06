import React from "react";
import { Container, Form } from "react-bootstrap";

export default function Filters() {
  return (
    <Container className="">
      <p className="h5">Marcas</p>
      <Form>
        <Form.Check
          label="Asparri"
          name="group1"
          type={"checkbox"}
          id={`inline-${"checkbox"}-1`}
          className="text-secondary"
        />
        <Form.Check
          label="Qutral"
          name="group1"
          type={"checkbox"}
          id={`inline-${"checkbox"}-2`}
          className="text-secondary"
        />
        <Form.Check
          label="Marca 3"
          name="group1"
          type={"checkbox"}
          id={`inline-${"checkbox"}-2`}
          className="text-secondary"
        />
        <Form.Check
          label="Marca 4"
          name="group1"
          type={"checkbox"}
          id={`inline-${"checkbox"}-2`}
          className="text-secondary"
        />
      </Form>
    </Container>
  );
}
