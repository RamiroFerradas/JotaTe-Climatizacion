"use client";

import { useState } from "react";
import { Card, Typography, List } from "@material-tailwind/react";
import Orders from "../../../productos/components/SIdebar/Orders";
import { Product } from "@/app/models";
import MenuCheckbox from "./MenuCheckbox";

export interface Option {
  label: string;
  value: string;
}

type Props = {
  setopenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
  productsFiltered: Product[];
  setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
  brands: { label: string }[];
  setLoadProducts: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  setopenSidebar,
  openSidebar,
  setProductsFiltered,
  productsFiltered,
  brands,
  setLoadProducts,
}: Props) {
  const [brandsFiltered, setBrandsFiltered] = useState<[]>([]);

  const [open, setOpen] = useState(0);

  const handleOpen = (value: number): void => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card
      className={`shadow-none shadow-blue-gray-900/5 z-50 backdrop-blur-[2px] bg-white/80 h-full ${
        !openSidebar ? `hidden md:block` : `block`
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-2 p-4 flex justify-between">
        <Typography variant="h5" color="blue-gray">
          Menu
        </Typography>
        <div className="md:hidden">
          <Typography
            variant="h6"
            color="blue-gray"
            onClick={() => setopenSidebar(false)}
          >
            x
          </Typography>
        </div>
      </div>
      <List>
        <MenuCheckbox
          items={brands}
          isOpen={1}
          title={"Marcas"}
          open={open}
          handleOpen={handleOpen}
          setSelected={setBrandsFiltered}
          selected={brandsFiltered}
          setProductsFiltered={setProductsFiltered}
          setLoadProducts={setLoadProducts}
        />

        <Orders
          open={open}
          handleOpen={handleOpen}
          setProductsFiltered={setProductsFiltered}
          productsFiltered={productsFiltered}
          setLoadProducts={setLoadProducts}
        />
      </List>
    </Card>
  );
}
