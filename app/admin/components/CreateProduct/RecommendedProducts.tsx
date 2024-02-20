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
  const currentRecommended = watch("recommendedJson") as {
    text: string;
    products: string[];
  };
  const handleCheckboxChange = (id: string) => {
    if (currentRecommended && currentRecommended.products) {
      const updatedRecommended = currentRecommended.products.includes(id)
        ? currentRecommended.products.filter(
            (productId: string) => productId !== id
          )
        : [...currentRecommended.products, id];

      setValue("recommendedJson", {
        text: currentRecommended.text,
        products: updatedRecommended,
      });
    }
  };

  // Separar productos recomendados de los no recomendados
  const recommendedProducts = FilteredProducts.filter((product) =>
    currentRecommended?.products.includes(product.id)
  );

  const nonRecommendedProducts = FilteredProducts.filter(
    (product) => !currentRecommended?.products.includes(product.id)
  );

  return (
    <section className="flex flex-wrap items-center justify-start w-full min-h-[30vh] max-h-[65vh] gap-3 overflow-y-auto">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="w-full">
              <Input
                placeholder="¡Agrega tambien alguna de estas opciones!"
                defaultValue={watch("recommendedJson")?.text}
                onChange={(e) =>
                  setValue("recommendedJson", {
                    ...watch("recommendedJson"),
                    text: e.target.value,
                  })
                }
                className="w-full"
              />
            </TableRow>
            <TableRow>
              <TableCell>
                <Input
                  placeholder="Buscar"
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
                <TableCell className="!p-0" align="center">
                  <Checkbox
                    color="success"
                    checked={currentRecommended?.products.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="!p-0"
                  />
                </TableCell>
              </TableRow>
            ))}

            {/* Luego renderizar productos no recomendados */}
            {nonRecommendedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="!p-0" align="center">
                  <Checkbox
                    color="success"
                    checked={currentRecommended?.products.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="!p-0"
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
