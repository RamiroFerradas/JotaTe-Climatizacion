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
import { useDispatch } from "react-redux";
import { orderByPrice } from "@/app/redux/slices/products";

type Props = {
  open: number;
  handleOpen: (value: number) => void;
  // handleOrderChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Orders({ open, handleOpen }: Props) {
  const dispatch = useDispatch();
  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const type = e.target.value;
    dispatch(orderByPrice({ type }));
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
