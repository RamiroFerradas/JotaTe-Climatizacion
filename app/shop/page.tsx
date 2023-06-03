"use client";
import { useState } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";
import { ThemeProvider } from "@material-tailwind/react";

export type EcommerceProps = {};

const Ecommerce: React.FC<EcommerceProps> = () => {
  const [openSidebar, setopenSidebar] = useState(false);
  return (
    <ThemeProvider>
      <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
      {/* <CategoriesNav /> */}
      <div className="flex">
        <Sidebar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
        <GridProducts />
      </div>
    </ThemeProvider>
  );
};

export default Ecommerce;
