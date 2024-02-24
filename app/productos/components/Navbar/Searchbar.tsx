export type SearchbarProps = {};
import { useScreenSize } from "@/app/hooks";
import { Product } from "@/app/models";
import { searchProducts } from "@/app/services/filters/searchProducts";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
  onChangue?: boolean;
};
export default function Searchbar({ setProductsFiltered, onChangue }: Props) {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { isMobile } = useScreenSize();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const results = await searchProducts(search);
      setProductsFiltered(results);
      setIsSearching(true);
    } catch (error) {
      console.error(error.message);
      setProductsFiltered([]);
    }
  };
  const handleClear = async () => {
    try {
      const results = await searchProducts("");
      setProductsFiltered(results);
      setSearch("");
      setIsSearching(false);
    } catch (error) {
      console.error(error.message);
      setProductsFiltered([]);
    }
  };

  return (
    <form
      className="flex relative gap-10 flex-row"
      onSubmit={!onChangue && handleSubmit}
    >
      <Input
        type={!onChangue ? "search" : "input"}
        label="Buscar producto"
        className="pr-20 md:w-[40vw] w-10 px-1"
        color="green"
        value={search}
        onChange={(e: any) => {
          onChangue && handleSubmit(e);
          setSearch(e.target.value);
        }}
      />

      {isSearching && (
        <Button
          size="sm"
          type="button" // Cambiado de "submit" a "button"
          className={`!absolute  ${
            onChangue ? "right-1" : "right-[5.8rem]"
          } top-1 rounded bg-[#006d54] border border-[#006d54]`}
          color="green"
          onClick={handleClear}
        >
          X
        </Button>
      )}

      {!onChangue && (
        <Button
          size="sm"
          type="submit"
          className="!absolute right-1 top-1 rounded bg-[#006d54] border border-[#006d54]"
          color="green"
        >
          {isMobile ? <FaSearch /> : "Buscar"}
        </Button>
      )}
    </form>
  );
}
