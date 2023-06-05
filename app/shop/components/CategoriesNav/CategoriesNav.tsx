"use client";
import { filterProductsByCategory } from "@/app/redux/slices/products";
import { useState } from "react";
import { useDispatch } from "react-redux";
export type CategoriesNavProps = {};

interface Category {
  id: number;
  value: string;
}

const CategoriesNav: React.FC<CategoriesNavProps> = () => {
  const dispatch = useDispatch();
  const categories: Category[] = [
    { id: 0, value: "Todos" },
    { id: 1, value: "Climatizacion" },
    { id: 2, value: "Utensillos" },
    { id: 3, value: "Parrilleros" },
    { id: 4, value: "Estufas" },
    { id: 5, value: "Termotanques" },
    { id: 6, value: "Servicios" },
  ];

  const [categoryActive, setCategoryActive] = useState("Climatizacion");

  return (
    <nav className="bg-[#006d54] h-16 flex items-center w-full overflow-x-auto text-center px-4 md:justify-center">
      <div className="flex gap-5 ">
        {categories.map(({ value }, i) => (
          <button
            className={`md:w-28`}
            onClick={() => {
              setCategoryActive(value);
              dispatch(filterProductsByCategory(value));
            }}
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
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoriesNav;
