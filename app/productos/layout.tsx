"use client";
import { useState, useEffect } from "react";
import { Appbar, CategoriesNav, GridProducts } from "./components";
import { Sidebar } from "./components/Sidebar";
import { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Footer, Loading } from "../components";
import { useDispatch } from "react-redux";
import { closeMenuCart } from "../redux/slices/cart";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useProductList } from "../hooks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setopenSidebar] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useProductList();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      sessionStorage.setItem("scrollPosition", String(scrollPosition));
    };

    window.addEventListener("scroll", handleScroll);

    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    return () => {
      // Remover el listener al desmontar el componente
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleClick = () => {
    dispatch(closeMenuCart());
    setopenSidebar(false);
  };

  if (loading) return <Loading />;

  return (
    <main className="">
      <PersistGate persistor={persistor}>
        <Toaster position="top-right" />
        {children}

        <div onClick={handleClick} className="">
          <Appbar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />

          <div>
            <CategoriesNav />

            <div className="flex justify-center items-start relative">
              <div className="md:w-1/4 absolute md:sticky md:top-0 left-0 w-full max-w-[80rem] h-full md:minh-[80vh] overflow-y-auto p-4 custom-scrollbar">
                <Sidebar
                  setopenSidebar={setopenSidebar}
                  openSidebar={openSidebar}
                />
              </div>
              <div className="md:w-3/4">
                <GridProducts />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </PersistGate>
    </main>
  );
}
