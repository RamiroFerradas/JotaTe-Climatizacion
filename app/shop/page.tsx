"use client";
import { useState } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";
import { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "../components";
import { ProductDetails } from "./components/ProductDetails";
import { useDispatch } from "react-redux";
import { closeMenuCart } from "../redux/slices/cart";
import { Toaster } from "react-hot-toast";
import { Pagination, Stack } from "@mui/material";

export type EcommerceProps = {};

const Ecommerce: React.FC<EcommerceProps> = () => {
  const [openSidebar, setopenSidebar] = useState(false);

  const dispatch = useDispatch();

  return (
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ProductDetails />
      <Toaster
        containerStyle={{
          // position: "fixed",
          zIndex: 9999,
        }}
        position="top-right"
      />
      <main
        onClick={() => {
          dispatch(closeMenuCart());
          setopenSidebar(false);
        }}
      >
        <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
        <CategoriesNav />

        <div className="flex justify-center items-start relative">
          <div className="md:w-1/4 absolute md:sticky md:top-0 left-0 w-full max-w-[80rem] h-full md:h-[80vh] overflow-y-auto p-4 custom-scrollbar">
            <Sidebar
              setopenSidebar={setopenSidebar}
              openSidebar={openSidebar}
            />
          </div>
          <div className="md:w-3/4 ">
            <GridProducts />
          </div>
        </div>
      </main>
    </PersistGate>
  );
};

export default Ecommerce;
