"use client";
export type SidebarProps = {
  setopenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
};

import { ChangeEvent, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { Brands, SubMenu } from "./components";
import { useDispatch } from "react-redux";
import { orderByPrice } from "@/app/redux/slices/products";

const Sidebar: React.FC<SidebarProps> = ({ setopenSidebar, openSidebar }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number): void => {
    setOpen(open === value ? 0 : value);
  };

  const sold = [
    { label: "Todos", value: "all" },
    { label: "Mas vendidos", value: "highSold" },
    { label: "Menos vendidos", value: "lowSold" },
  ];
  const price = [
    { label: "Todos", value: "all" },
    { label: "Mayor precio", value: "asc" },
    { label: "Menor precio", value: "desc" },
  ];
  const dispatch = useDispatch();
  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value;
    dispatch(orderByPrice({ type }));
  };
  return (
    <Card
      className={`md:relative absolute md:top-0 top-32 left-0 h-auto w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50 ${
        !openSidebar ? `hidden md:block` : `block`
      } backdrop-blur-[2px] bg-white/80 h-96 md:w-1/4`}
    >
      <div className="mb-2 p-4 flex justify-between">
        <Typography variant="h5" color="blue-gray">
          Menu
        </Typography>
        <div className="md:hidden">
          <Typography
            variant="h6"
            color="blue-gray"
            onClick={() => setopenSidebar(false)}
          >
            x
          </Typography>
        </div>
      </div>
      <List>
        <Brands open={open} handleOpen={handleOpen} />
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
              title="Ordenar por ventas"
              items={sold}
              identifier={1}
              name="orderSales"
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
        {/* <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
      </List>
    </Card>
  );
};
export default Sidebar;
