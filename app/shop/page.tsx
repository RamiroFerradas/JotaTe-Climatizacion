"use client";
import { useState } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";

export type EcommerceProps = {};

const Ecommerce: React.FC<EcommerceProps> = () => {
  const [openSidebar, setopenSidebar] = useState(false);
  return (
    <>
      <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
      {/* <CategoriesNav /> */}
      <div className="flex">
        <Sidebar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
        <GridProducts />
      </div>
    </>
  );
};

export default Ecommerce;
