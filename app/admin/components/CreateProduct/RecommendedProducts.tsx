import React, { ChangeEvent, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Product } from "@/app/models";

type Props = {
  products: Product[];
  method: any;
};
export default function RecommendedProducts({ products, method }: Props) {
  const { setValue, watch } = method;
  const [FilteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();

    // Filtrar productos en función del término de búsqueda
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    setFilteredProducts(filteredProducts);
  };
  const currentRecommended = watch("recommended");

  const handleCheckboxChange = (id: string) => {
    const currentRecommended = watch("recommended");

    const updatedRecommended = currentRecommended.includes(id)
      ? currentRecommended.filter((productId) => productId !== id)
      : [...currentRecommended, id];

    setValue("recommended", updatedRecommended);
  };

  // Separar productos recomendados de los no recomendados
  const recommendedProducts = FilteredProducts.filter((product) =>
    currentRecommended.includes(product.id)
  );

  const nonRecommendedProducts = FilteredProducts.filter(
    (product) => !currentRecommended.includes(product.id)
  );

  return (
    <section className="flex flex-wrap items-center justify-start w-full min-h-[30vh] max-h-[65vh] gap-3 overflow-y-auto">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Input
                  placeholder="Search Products"
                  startAdornment={
                    <InputAdornment position="start">
                      <Search color="success" />
                    </InputAdornment>
                  }
                  onChange={handleSearchChange}
                />
              </TableCell>
              <TableCell>Recomendado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Renderizar productos recomendados primero */}
            {recommendedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Checkbox
                    color="success"
                    checked={currentRecommended.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}

            {/* Luego renderizar productos no recomendados */}
            {nonRecommendedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Checkbox
                    color="success"
                    checked={currentRecommended.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
