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

    dispatch(searchProducts(search));
    setIsSearching(true);
  };

  const handleClear = () => {
    dispatch(searchProducts(""));
    setSearch("");
    setIsSearching(false);
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
};

export default Searchbar;
