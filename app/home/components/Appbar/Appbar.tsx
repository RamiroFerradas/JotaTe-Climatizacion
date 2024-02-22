"use client";

import { useState, useEffect } from "react";
import { Button, IconButton, Collapse } from "@material-tailwind/react";

import jotaTeLogo from "../../../../public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import Image from "next/image";

import Link from "next/link";
import { useScrollSections } from "@/app/hooks";
import Navlist from "./Navlist/Navlist";
export type NavbarProps = {};

const Appbar: React.FC<NavbarProps> = () => {
  const [openNav, setOpenNav] = useState(false);

  const { scrolled } = useScrollSections();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <nav
      className={`z-50 mx-auto px-4 lg:px-8 w-full fixed transition-all  ${
        scrolled
          ? `bg-[#d3a16592] py-3 rounded-b-[27%] backdrop-blur-[2px]`
          : `py-6  bg-white`
      }`}
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900 w-full">
        <Image src={jotaTeLogo} alt="logo_jota_te" width={130} height={130} />
        <div className="hidden lg:block">
          <Navlist />
        </div>
        <Link href="/productos">
          <Button
            size="sm"
            className="rounded bg-[#006d54] border border-[#006d54] hidden lg:inline-block"
            color="green"
          >
            <span>Productos</span>
          </Button>
        </Link>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto flex justify-center items-center flex-col">
          <Navlist />
          <Link href={"/productos"}>
            <Button
              size="sm"
              className="rounded bg-[#006d54] border border-[#006d54 mb-2 w-28"
              color="green"
            >
              <span>Productos</span>
            </Button>
          </Link>
        </div>
      </Collapse>
    </nav>
  );
};

export default Appbar;
