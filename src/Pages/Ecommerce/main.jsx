import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";

export default function Ecommerce() {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <p className="h1">Ecommerce en desarrollo...</p>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </div>
  );
}
