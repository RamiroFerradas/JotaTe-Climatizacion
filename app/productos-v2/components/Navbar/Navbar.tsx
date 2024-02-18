import Image from "next/image";
import jotaTeLogo from "../../../../public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import Link from "next/link";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import CartMenu from "./CartMenu";
import CartIcon from "./CartIcon";
import Searchbar from "./Searchbar";
import { Product } from "@/app/models";
import { useOnClickOutside } from "@/app/hooks/onClickOutsideRef";
import { useCart } from "../../context/CartContext";

type Props = {
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
  setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function Navbar({
  setProductsFiltered,
  openSidebar,
  setOpenSidebar,
}: Props) {
  const cartRef = useRef(null);
  const { closeMenuCart } = useCart();

  useOnClickOutside(cartRef, () => closeMenuCart());

  return (
    <div className="mx-auto mt-1 w- md:py-3 px-2 md:px-8 relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900 w-full">
        <Link href="/">
          <Image
            src={jotaTeLogo}
            alt="logo_jota_te"
            width={130}
            height={130}
            className="order-1"
            priority
          />
        </Link>
        <div className="flex md:w-max order-4 sm:order-3 md:order-2 justify-center items-center gap-2 flex-wrap">
          <Searchbar setProductsFiltered={setProductsFiltered} />
        </div>
        <div className="md:hidden flex md:w-max xs:order-4 md:order-4 justify-center items-center gap-2 flex-wrap order-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenSidebar(!openSidebar);
            }}
            className="rounded bg-[#006d54] border border-[#006d54] overflow-hidden md:hidden w-10 flex items-center justify-center h-9 text-white mr-2"
            color="green"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
        <div ref={cartRef} className="order-2 md:order-3">
          <div className="md:gap-6 gap-3 text-gray-600 flex justify-center items-center ">
            <CartIcon setOpenSidebar={setOpenSidebar} />
          </div>
          <CartMenu />
        </div>
      </div>
    </div>
  );
}
