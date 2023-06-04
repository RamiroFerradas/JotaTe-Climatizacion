import useListBrands from "@/app/hooks/useListBrands";
import useProductList from "@/app/hooks/useProductList";
import { Product } from "@/app/models/Product";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
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
import { useState } from "react";

type Props = {
  open: number;
  handleOpen: (value: number) => void;
};

export default function Brands({ open, handleOpen }: Props) {
  const { products, selectedBrands, setSelectedBrands } = useProductList();
  const { allBrands } = useListBrands();

  // const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const handleChecked = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;
    if (checked) {
      // filterProductsByBrand()
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, value]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((brand) => brand !== value)
      );
    }
  };

  return (
    <Accordion
      open={open === 1}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            open === 1 ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={open === 1}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="border-b-0 p-3"
        >
          <ListItemPrefix>
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            Marcas
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <Card>
          <List>
            {allBrands.map((brand, i) => (
              <ListItem className="p-0" key={i}>
                <label
                  htmlFor={`vertical-list-${brand.label}`}
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id={`vertical-list-${brand.label}`}
                      ripple={false}
                      color="teal"
                      value={brand.label}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      onChange={handleChecked}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {brand.label}
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
