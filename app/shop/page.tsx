"use client";
import { useState } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";
import { Provider } from "react-redux";
import { AppStore, persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "../components";
import { ProductDetails } from "./components/ProductDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeMenuCart } from "../redux/slices/cart";

export type EcommerceProps = {};

const Ecommerce: React.FC<EcommerceProps> = () => {
  const [openSidebar, setopenSidebar] = useState(false);

  const dispatch = useDispatch();

  return (
    <PersistGate loading={<Loading />} persistor={persistor}>
      <main onClick={() => dispatch(closeMenuCart())}>
        <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
        <CategoriesNav />
        <div className="flex justify-center items-start">
          <Sidebar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />

          <GridProducts />
        </div>
        <ProductDetails />
      </main>
    </PersistGate>
  );
};

export default Ecommerce;
