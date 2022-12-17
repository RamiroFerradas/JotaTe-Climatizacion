import React from "react";
// import product1 from "../../assets/Productos destacados/BASE S 6.PNG";
import product4 from "../../assets/Productos destacados/DISCO ASAPARRI 6.jpg";
// import product2 from "../../assets/Productos destacados/brasero de pie asaparri 4.JPG";
// import product3 from "../../assets/Productos destacados/IMG_4139.JPG";
import product5 from "../../assets/Productos destacados/IMG_0476_Facetune_15-10-2020-10-52-07.jpg";
import product6 from "../../assets/Productos destacados/IMG_5185_Facetune_23-09-2021-16-21-23.jpg";
// import product7 from "../../assets/Productos destacados/TABLITA.png";
import product8 from "../../assets/Productos destacados/salamandras-08.jpg";

export default function Products() {
  const productos = [
    { item: product4, name: "Disco Asparri", price: 9.999 },
    { item: product5, name: "Tapa Plancha Asparri", price: 9.999 },
    { item: product6, name: "Disco Asparri", price: 9.999 },
    { item: product8, name: "Salamandra Asparri", price: 9.999 },
  ];
  return { productos };
}
