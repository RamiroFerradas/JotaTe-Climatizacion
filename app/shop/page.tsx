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
      <div className="overflow-hidden">
        <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
        <CategoriesNav />
        <div className="flex w-screen justify-center items-start">
          <Sidebar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />

          <GridProducts />
        </div>
      </div>
    </Provider>
  );
};

export default Ecommerce;
