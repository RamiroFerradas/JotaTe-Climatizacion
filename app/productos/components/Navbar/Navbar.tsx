import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRef } from "react";
import CartMenu from "./CartMenu";
import CartIcon from "./CartIcon";
import Searchbar from "./Searchbar";
import { Product } from "@/app/models";
import { useOnClickOutside } from "@/app/hooks/onClickOutsideRef";
import { useCart } from "../../context/CartContext";
import jotaTeLogo from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import jotaTeLogoResponsive from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté logotipo1.png";
import { useScreenSize } from "@/app/hooks";

type Props = {
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
  setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Navbar({
  setProductsFiltered,
  setOpenSidebar,
  products,
  setCurrentPage,
}: Props) {
  const { closeMenuCart } = useCart();
  const { isMobile } = useScreenSize();

  const cartRef = useRef(null);
  useOnClickOutside(cartRef, () => closeMenuCart());

  return (
    <div className="mx-auto mt-1 w- md:py-3 px-2 md:px-8 relative w-full">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900 w-full">
        <Link href="/">
          <Image
            src={isMobile ? jotaTeLogoResponsive : jotaTeLogo}
            alt="logo_jota_te"
            width={isMobile ? 50 : 130}
            height={isMobile ? 50 : 130}
            // className="order-1"
            priority
          />
        </Link>
        <div className="flex md:w-max justify-center items-center gap-2 flex-wrap">
          <Searchbar
            products={products}
            setProductsFiltered={setProductsFiltered}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div ref={cartRef} className="order-">
          <div className="md:gap-6 gap-3 text-gray-600 flex justify-center items-center ">
            <CartIcon setOpenSidebar={setOpenSidebar} />
          </div>
          <CartMenu />
        </div>
      </div>
    </div>
  );
}
