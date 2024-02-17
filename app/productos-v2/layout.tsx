import { Footer } from "@/app/components";
import { fetchProducts } from "@/app/services/fetchProducts";
import { Toaster } from "react-hot-toast";
import { Appbar } from "./components";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await fetchProducts();
  // console.log(products);

  const handleClick = () => {
    // dispatch(closeMenuCart());
    // setopenSidebar(false);
  };

  return (
    <main>
      <Toaster position="top-right" />

      {children}

      <div className="">
        <Appbar />

        {/* <div>
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
        </div> */}
      </div>

      <Footer />
    </main>
  );
}
