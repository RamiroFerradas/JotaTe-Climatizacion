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
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex items-center">
      <input
        type="search"
        placeholder="Producto..."
        value={searchValue}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md md:w-80"
      />
    </div>
  );
}
