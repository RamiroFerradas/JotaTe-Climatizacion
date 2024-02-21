import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  ListItem,
  AccordionHeader,
  ListItemPrefix,
  Typography,
  AccordionBody,
} from "@material-tailwind/react";
import SubMenu from "./SubMenu";
import { ChangeEvent } from "react";
import { FetchAndSortProducts } from "@/app/services/orders/sortedProducts";
import { Product } from "@/app/models";
import { SortOrderOptions } from "@/app/models/SortOrderOption";

type Props = {
  open: number;
  handleOpen: (value: number) => void;
  setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
  productsFiltered: Product[];
  setLoadProducts: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Orders({
  open,
  handleOpen,
  setProductsFiltered,
  productsFiltered,
  setLoadProducts,
}: Props) {
  const handleOrderChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const type = e.target.value;

    try {
      setLoadProducts(true);
      const sortedProducts = await FetchAndSortProducts(
        "price",
        type as SortOrderOptions,
        productsFiltered
      );
      setProductsFiltered(sortedProducts);
    } catch (error) {
      console.error(
        "Error al cambiar el orden de los productos:",
        error.message
      );
    } finally {
      setLoadProducts(false);
    }
  };

  const price = [
    { label: "Todos", value: "all" },
    { label: "Mayor precio", value: "asc" },
    { label: "Menor precio", value: "desc" },
  ];

  return (
    <Accordion
      open={open === 2}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            open === 2 ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={open === 2}>
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="border-b-0 p-3"
        >
          <ListItemPrefix>
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            Ordenar
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        {/* <SubMenu
              title="Ordenar por consultas"
              items={consults}
              identifier={1}
              name="orderSales"
              handleChange={handleOrderConsults}
            /> */}
        <SubMenu
          title="Ordenar por precio"
          items={price}
          identifier={2}
          name="orderPrice"
          handleChange={handleOrderChange}
        />
      </AccordionBody>
    </Accordion>
  );
}
