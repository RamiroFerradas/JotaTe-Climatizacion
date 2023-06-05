export type SearchbarProps = {};
import { searchProducts } from "@/app/redux/slices/products";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Searchbar: React.FC<SearchbarProps> = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSearching) {
      // Limpiar búsqueda
      dispatch(searchProducts(""));
      setSearch("");
      setIsSearching(false);
    } else {
      // Realizar búsqueda
      dispatch(searchProducts(search));
      setIsSearching(true);
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

      <Button
        size="sm"
        type="submit"
        className="!absolute right-1 top-1 rounded bg-[#006d54] border border-[#006d54]"
        color="green"
      >
        {isSearching ? "Limpiar" : "Buscar"}
      </Button>
    </form>
  );
};

export default Searchbar;
