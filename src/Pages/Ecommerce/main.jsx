import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Ecommerce() {
  const navigate = useNavigate();
  return (
    <div>
      <p className="h1">Ecommerce en desarrollo...</p>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </div>
  );
}
