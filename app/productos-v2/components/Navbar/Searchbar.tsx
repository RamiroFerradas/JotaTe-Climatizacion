export type SearchbarProps = {};
import { Product } from "@/app/models";
import { searchProducts } from "@/app/services/filters/searchProducts";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";

type Props = {
  setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
};
export default function Searchbar({ setProductsFiltered }: Props) {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const results = await searchProducts(search);
      setProductsFiltered(results);
      setIsSearching(true);
    } catch (error) {
      console.error("Error al buscar productos:", error.message);
    }
  };
  const handleClear = async () => {
    try {
      const results = await searchProducts("");
      setProductsFiltered(results);
      setSearch("");
      setIsSearching(false);
    } catch (error) {
      console.error("Error al buscar productos:", error.message);
    }
  };

  return (
    <form className="flex relative gap-10 flex-row" onSubmit={handleSubmit}>
      <Input
        type="input"
        label="Buscar producto"
        className="pr-20 md:w-[40vw]"
        color="green"
        containerProps={{
          className: "minw-[288px]",
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isSearching && (
        <Button
          size="sm"
          type="button" // Cambiado de "submit" a "button"
          className="!absolute right-[5.8rem] top-1 rounded bg-[#006d54] border border-[#006d54]"
          color="green"
          onClick={handleClear}
        >
          X
        </Button>
      )}
      <Button
        size="sm"
        type="submit"
        className="!absolute right-1 top-1 rounded bg-[#006d54] border border-[#006d54]"
        color="green"
      >
        Buscar
      </Button>
    </form>
  );
}
