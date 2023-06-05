"use client";
import { useState } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "../components";

export type EcommerceProps = {};

const Ecommerce: React.FC<EcommerceProps> = () => {
  const [openSidebar, setopenSidebar] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <div>
          <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
          <CategoriesNav />
          <div className="flex justify-center items-start">
            <Sidebar
              setopenSidebar={setopenSidebar}
              openSidebar={openSidebar}
            />

            <GridProducts />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default Ecommerce;
