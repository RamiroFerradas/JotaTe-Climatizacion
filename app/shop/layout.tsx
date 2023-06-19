"use client";
import { useState } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";
import { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "../components";
import { useDispatch } from "react-redux";
import { closeMenuCart } from "../redux/slices/cart";
import { Toaster } from "react-hot-toast";
import { useScrollRestoration } from "../hooks";
import { useRouter } from "next/navigation";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setopenSidebar] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <main>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Toaster position="top-right" />
        {children}

        <div
          onClick={() => {
            dispatch(closeMenuCart());
            setopenSidebar(false);
          }}
        >
          <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />

          <div>
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
          </div>
        </div>
      </PersistGate>
    </main>
  );
}
