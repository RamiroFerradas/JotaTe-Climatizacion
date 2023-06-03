"use client";
export type SidebarProps = {
  setopenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
};

import { useState } from "react";
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
import SubMenu from "./SubMenu";

const Sidebar: React.FC<SidebarProps> = ({ setopenSidebar, openSidebar }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const brands = [
    { label: "Asparri" },
    { label: "Qutral" },
    { label: "Marca 2" },
    { label: "Marca 3" },
    { label: "Marca 4" },
    { label: "Marca 5" },
  ];

  const sold = [
    { label: "Todos", value: "all" },
    { label: "Mas vendidos", value: "highSold" },
    { label: "Menos vendidos", value: "lowSold" },
  ];
  const price = [
    { label: "Todos", value: "all" },
    { label: "Mayor precio", value: "highPrice" },
    { label: "Menor precio", value: "lowPrice" },
  ];

  return (
    <Card
      className={`md:relative absolute md:top-0 top-32 left-0 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-40 ${
        !openSidebar ? `hidden md:block` : `block`
      } backdrop-blur-[2px] bg-white/80`}
    >
      <div className="mb-2 p-4 flex justify-between">
        <Typography variant="h5" color="blue-gray">
          Menu
        </Typography>
        <Typography
          variant="h6"
          color="blue-gray"
          onClick={() => setopenSidebar(false)}
        >
          x
        </Typography>
      </div>
      <List>
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
                {brands.map((brand, i) => (
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
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
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
            <SubMenu
              title="Ordenar por ventas"
              items={sold}
              identifier={1}
              name="orderSales"
            />
            <SubMenu
              title="Ordenar por precio"
              items={price}
              identifier={2}
              name="orderPrice"
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
