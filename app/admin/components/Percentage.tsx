"use client";
import { Product } from "@/app/models";
import { TextField } from "@mui/material";
import { useState, Dispatch } from "react";
import { Button, IconButton, Collapse } from "@material-tailwind/react";
import Select from "react-select";

type Props = {
  setSelected: Dispatch<React.SetStateAction<Product[]>>;
  optionsBrands: { label: string; key: string }[];
  selectedProducts: Product[];
  products: Product[];
  setFilteredProducts: Dispatch<React.SetStateAction<Product[]>>;
  setPage: Dispatch<React.SetStateAction<number>>;
};

export default function Percentage({
  setSelected,
  optionsBrands,
  selectedProducts,
  products,
  setFilteredProducts,
  setPage,
}: Props) {
  const [percentage, setPercentage] = useState("");

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentage(e.target.value);
  };

  const handleApplyPercentage = () => {
    const percentageValue = parseFloat(percentage);

    if (!isNaN(percentageValue)) {
      const updatedProducts = selectedProducts.map((product) => ({
        ...product,
        newPrice: Math.round(
          Number(product.price) * (1 + percentageValue / 100)
        ),
      }));

      // Actualizar el estado con los productos modificados
      setSelected(updatedProducts);
    }
  };

  const handleBrandChange = (selectedOption: any) => {
    if (selectedOption && selectedOption.key === "Todas") {
      setSelected([]);
      setFilteredProducts([]);
    } else {
      const filteredProducts = products.filter(
        (product) => product.brand === selectedOption.key
      );
      setFilteredProducts(filteredProducts);
      setPage(0);
    }
  };

  return (
    <div className="flex justify-end items-center gap-3 container mx-auto">
      <div className="w-44">
        <Select
          className="basic-single"
          classNamePrefix="Marca"
          defaultValue={optionsBrands[0]}
          isClearable={true}
          isSearchable
          name="color"
          options={optionsBrands}
          onChange={handleBrandChange}
        />
      </div>
      <TextField
        label="Porcentage"
        id="percentageInput"
        type="number"
        value={percentage}
        size="small"
        onChange={handlePercentageChange}
        color="success"
        className="w-32"
      />

      <Button
        size="sm"
        className="rounded bg-[#F65B36] border border-[#F65B36] hidden lg:inline-block"
        onClick={handleApplyPercentage}
      >
        <span>Aplicar</span>
      </Button>
    </div>
  );
}
