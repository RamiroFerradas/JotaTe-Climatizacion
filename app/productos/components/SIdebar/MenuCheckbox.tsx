import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

import { Product } from "@/app/models";
import { FormEvent } from "react";
import { FilterProductsByBrand } from "@/app/services/filters/filterProdByBrand";

type Props = {
  open: number;
  handleOpen: (value: number) => void;
  items: { label: string }[];
  title: string;
  isOpen: number;
  setSelected: (product: any) => void;
  selected: string[];
  setLoadProducts: React.Dispatch<React.SetStateAction<boolean>>;
  setProductsFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
  subCategoryActive: string;
};
export default function MenuCheckbox({
  open,
  handleOpen,
  items,
  title,
  isOpen,
  setSelected,
  selected,
  setLoadProducts,
  setProductsFiltered,
  subCategoryActive,
}: Props) {
  const handleChecked = async (event: FormEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;

    const updateFilterAndSelected = async (selectedBrands: string[]) => {
      try {
        setLoadProducts(true);
        const filteredProducts = await FilterProductsByBrand(
          selectedBrands,
          subCategoryActive
        );
        setSelected(selectedBrands), setProductsFiltered(filteredProducts);
      } catch (error) {
        console.error("Error al actualizar productos y marcas:", error.message);
      } finally {
        setLoadProducts(false);
      }
    };

    if (value !== "Todos") {
      if (checked) {
        await updateFilterAndSelected([...selected, value]);
      } else {
        await updateFilterAndSelected(selected.filter((sel) => sel !== value));
      }
    } else {
      await updateFilterAndSelected([]);
    }
  };

  return (
    <Accordion
      open={open === isOpen}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            open === isOpen ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={open === isOpen}>
        <AccordionHeader
          onClick={() => handleOpen(isOpen)}
          className="border-b-0 p-3"
        >
          <ListItemPrefix>
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            {title}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <Card>
          <List>
            {items.length > 1 && (
              <ListItem className="p-0">
                <label
                  htmlFor={`vertical-list-todas`}
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id={`vertical-list-todas`}
                      ripple={false}
                      color="teal"
                      value={"Todos"}
                      checked={!selected.length}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      onChange={handleChecked}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Todas
                  </Typography>
                </label>
              </ListItem>
            )}
            {items.map((ele: any, i: number) => (
              <ListItem className="p-0" key={i}>
                <label
                  htmlFor={`vertical-list-${ele.label}`}
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id={`vertical-list-${ele.label}`}
                      ripple={false}
                      color="teal"
                      value={ele.label}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      checked={
                        selected.includes(ele.label) || items.length === 1
                      }
                      onChange={handleChecked}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {ele.label}
                  </Typography>
                </label>
              </ListItem>
            ))}
          </List>
        </Card>
      </AccordionBody>
    </Accordion>
  );
}
