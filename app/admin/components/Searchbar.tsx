import { Product } from "@/app/models";
import React, { ChangeEvent, useState } from "react";

type SearchBarProps = {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function SearchBar({
  products,
  setFilteredProducts,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filtered);
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Producto..."
        value={searchValue}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-80"
      />
    </div>
  );
}
