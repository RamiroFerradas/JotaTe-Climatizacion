"use client";
import { useState } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";
import { Provider } from "react-redux";
import store from "../redux/store";

export type EcommerceProps = {};

const Ecommerce: React.FC<EcommerceProps> = () => {
  const [openSidebar, setopenSidebar] = useState(false);
  return (
    <Provider store={store}>
      <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
      <CategoriesNav />
      <div className="flex">
        <Sidebar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
        <GridProducts />
      </div>
    </Provider>
  );
};

export default Ecommerce;
