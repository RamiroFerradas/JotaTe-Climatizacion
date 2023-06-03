"use client";
import { useState } from "react";
export type CategoriesNavProps = {};

interface Category {
  id: number;
  value: string;
}

const CategoriesNav: React.FC<CategoriesNavProps> = () => {
  const categories: Category[] = [
    { id: 1, value: "Climatizacion" },
    { id: 2, value: "Utensillos" },
    { id: 3, value: "Parrilleros" },
    { id: 4, value: "Estufas" },
    { id: 5, value: "Termotanques" },
    { id: 6, value: "Servicios" },
  ];

  const [categoryActive, setCategoryActive] = useState("Climatizacion");

  return (
    <nav className="bg-[#006d54] h-16 flex justify-center items-center gap-5 w-full overflow-y-scroll text-center">
      {categories.map(({ value }, i) => (
        <a
          className={`md:w-28`}
          onClick={() => setCategoryActive(value)}
          key={i}
        >
          <span
            key={i}
            className={`${
              value === categoryActive
                ? `text-[#ff6e25] font-black text-lg cursor-pointer`
                : `text-[#f9f4f4] cursor-pointer hover:text-[#ff6e25] hover:font-black hover:text-lg`
            }`}
          >
            {value}
          </span>
        </a>
      ))}
    </nav>
  );
};

export default CategoriesNav;
