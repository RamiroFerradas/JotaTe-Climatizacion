"use client";
import { Product } from "@/app/models";
import { TextField } from "@mui/material";
import { useState, Dispatch } from "react";
import { Button, IconButton, Collapse } from "@material-tailwind/react";
import Select from "react-select";
import { OptionType } from "@/app/models/OptionType";
import { selectStyles } from "../StylesSelect";

type Props = {
  setSelected: Dispatch<React.SetStateAction<Product[]>>;
  optionsBrands: OptionType[];
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
        ).toString(),
      }));

      setSelected(updatedProducts);
      setPercentage("");
    }
  };

  const handleBrandChange = (selectedOption: OptionType) => {
    if (selectedOption && selectedOption.value === "Todas") {
      setSelected([]);
      setFilteredProducts([]);
    } else {
      const filteredProducts = products.filter(
        (product) => product.brand === selectedOption.value
      );
      setFilteredProducts(filteredProducts);
      setSelected(filteredProducts);
      setPage(0);
    }
  };

  const sortedOptionsBrands = optionsBrands
    .slice()
    .sort((a, b) => a.label?.localeCompare(b.label));

  const optionsBrandsWithAll: OptionType[] = [
    { label: "Todas", value: "Todas" },
    ...sortedOptionsBrands,
  ];

  return (
    <div className="flex justify-end items-center gap-3 container mx-16">
      <div className="w-44">
        <Select
          className="basic-single"
          classNamePrefix="Marca"
          defaultValue={optionsBrandsWithAll[0]}
          isSearchable
          name="color"
          options={optionsBrandsWithAll}
          onChange={handleBrandChange}
          styles={selectStyles(false)}
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
