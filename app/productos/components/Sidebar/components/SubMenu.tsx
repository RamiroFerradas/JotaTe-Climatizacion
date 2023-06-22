import { ChangeEvent, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Radio,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

interface MenuItem {
  label: string;
  value?: string;
  // Otros campos relevantes
}

interface SubMenuProps {
  items: MenuItem[];
  identifier: number;
  title: string;
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SubMenu({
  items,
  identifier,
  title,
  name,
  handleChange,
}: SubMenuProps) {
  const [openSubAccordion, setOpenSubAccordion] = useState(0);
  const handleOpenSubAccordion = (value: number) => {
    setOpenSubAccordion(openSubAccordion === value ? 0 : value);
  };

  return (
    <Accordion
      open={openSubAccordion === identifier}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            openSubAccordion === identifier ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={openSubAccordion === identifier}>
        <AccordionHeader
          onClick={() => handleOpenSubAccordion(identifier)}
          className="border-b-0 p-3"
        >
          <ListItemPrefix>
            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            {title}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List>
          {items.map((value, i) => (
            <ListItem className="p-0" key={i + identifier}>
              <label
                htmlFor={`vertical-list-${value.label}`}
                className="px-3 py-2 flex items-center w-full cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Radio
                    name={`${name}`}
                    id={`vertical-list-${value.label}`}
                    ripple={false}
                    color="teal"
                    value={value.value}
                    onChange={handleChange}
                    defaultChecked={value.value === "all"}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  {value.label}
                </Typography>
              </label>
            </ListItem>
          ))}
        </List>
      </AccordionBody>
    </Accordion>
  );
}
