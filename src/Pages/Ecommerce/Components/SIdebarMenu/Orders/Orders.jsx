import React from "react";
import { Container, Form } from "react-bootstrap";

export default function Orders() {
  return (
    <Container className="">
      <p className="h5">Ordenar</p>
      <Form>
        <Form.Check
          label="Todos"
          name="group1"
          type={"radio"}
          id={`inline-radio-2`}
          className="text-secondary"
          defaultChecked
        />
        <Form.Check
          label="Menor precio"
          name="group1"
          type={"radio"}
          id={`inline-radio-2`}
          className="text-secondary"
        />
        <Form.Check
          label="Mayor precio"
          name="group1"
          type={"radio"}
          id={`inline-radio-3`}
          className="text-secondary"
        />
        <br />
        <Form.Check
          label="Todos"
          name="group2"
          type={"radio"}
          id={`inline-radio-4`}
          className="text-secondary"
          defaultChecked
        />
        <Form.Check
          label="Mas vendido"
          name="group2"
          type={"radio"}
          id={`inline-radio-4`}
          className="text-secondary"
        />
        <Form.Check
          label="Menos vendido"
          name="group2"
          type={"radio"}
          id={`inline-radio-5`}
          className="text-secondary"
        />
      </Form>
    </Container>
  );
}
