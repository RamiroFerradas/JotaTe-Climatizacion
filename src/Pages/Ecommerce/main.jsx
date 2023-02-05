import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../Hooks/useScreenSize";
import CategoriesNav from "./Components/CategoriesNav/CategoriesNav";
import NavBar from "./Components/NavBar/NavBar";

export default function Ecommerce() {
  const { width } = useScreenSize();

  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      {width >= 768 ? <CategoriesNav /> : null}
      <p className="h1">Ecommerce en desarrollo...</p>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </div>
  );
}
