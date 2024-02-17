"use client";
export type AppbarProps = {
  // setopenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  // openSidebar: boolean;
};
// import Image from "next/image";

// import jotaTeLogo from "../../../../public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
// import Link from "next/link";
// import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Appbar: React.FC<AppbarProps> = ({ setopenSidebar, openSidebar }) => {
  // const [showCartMenu, setShowCartMenu] = useState(false);

  return (
    <div
      className="mx-auto w- md:py-3 px-2 md:px-8 relative z-50"
      // onClick={() => setShowCartMenu(false)}
    >
      {/* <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900 w-full">
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
          <Searchbar />
        </div>
        <div className="md:hidden flex md:w-max xs:order-4 md:order-4 justify-center items-center gap-2 flex-wrap order-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setopenSidebar(!openSidebar);
            }}
            className="rounded bg-[#006d54] border border-[#006d54] overflow-hidden md:hidden w-10 flex items-center justify-center h-9 text-white mr-2"
            color="green"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="md:gap-6 gap-3 text-gray-600 flex justify-center items-center order-2 md:order-3">
          <CartIcon
            setopenSidebar={setopenSidebar}
            showCartMenu={showCartMenu}
          />
        </div>
        <CartMenu />
      </div> */}
    </div>
  );
};
export default Appbar;
