"use client";
export type AppbarProps = {
  setopenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
};
import { Navbar, Button, Input, IconButton } from "@material-tailwind/react";
import Image from "next/image";
// import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

import jotaTeLogo from "../../../../public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import Link from "next/link";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

const Appbar: React.FC<AppbarProps> = ({ setopenSidebar, openSidebar }) => {
  return (
    <Navbar className="mx-auto max-w-screen-2xl md:py-3 px-2 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900 w-full">
        <Link href={"/home"}>
          <Image
            src={jotaTeLogo}
            alt="logo_jota_te"
            width={130}
            height={130}
            className="order-1"
            priority
          />
        </Link>
        <div className="flex md:w-max  order-4 sm:order-3 md:order-2 justify-center items-center gap-2 flex-wrap">
          <div className="flex relative gap-10 flex-row">
            <Input
              type="search"
              label="Panel solar..."
              className="pr-20 md:w-[40vw]"
              containerProps={{
                className: "minw-[288px]",
              }}
            />
            <Button
              size="sm"
              className="!absolute right-1 top-1 rounded bg-[#006d54] border border-[#006d54]"
              color="green"
            >
              Buscar
            </Button>
          </div>
        </div>
        <div className="md:hidden flex md:w-max xs:order-4 md:order-4 justify-center items-center gap-2 flex-wrap order-3">
          <button
            onClick={() => setopenSidebar(!openSidebar)}
            // size="sm"
            className="rounded bg-[#006d54] border border-[#006d54] overflow-hidden md:hidden w-8 flex items-center justify-center h-9 text-white"
            color="green"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="md:gap-6 gap-3 text-gray-600 flex justify-center items-center order-2 md:order-3">
          <div
            className={`flex-col flex justify-center hover:text-[#006d54] transition-all items-center`}
          >
            <FaUser />

            <p>Perfil</p>
          </div>
          <div
            className={`flex-col flex justify-center hover:text-[#006d54] transition-all items-center`}
          >
            <MdFavorite />

            <p>Favoritos</p>
          </div>
          <div
            className={`flex-col flex justify-center hover:text-[#006d54] transition-all items-center`}
          >
            <FaShoppingCart />

            <p>Carrito</p>
          </div>
        </div>
      </div>
    </Navbar>
  );
};
export default Appbar;