"use client";
export type SidebarProps = {
  setopenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
};

import { ChangeEvent, useState } from "react";
import { Card, Typography, List } from "@material-tailwind/react";
import { MenuCheckbox, SubMenu } from "./components";
import { useDispatch } from "react-redux";
import {
  filterProductsBySubCategory,
  orderByConsults,
  orderByPrice,
} from "@/app/redux/slices/products";
import { useFilterProducts, useListBrands } from "@/app/hooks";
import { AppStore } from "@/app/redux/store";
import { useSelector } from "react-redux";
import Orders from "./components/Orders";

export interface Option {
  label: string;
  value: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setopenSidebar, openSidebar }) => {
  const { allProducts, filteredProducts } = useSelector(
    (state: AppStore) => state.products
  );

  const allMatchCategory = !filteredProducts.some(
    (prod) => prod.category !== "Salamandras a leña"
  );

  // const salamandrasLeñaSubcategoriesSet = new Set(
  //   allProducts
  //     .filter((prod) => prod.category === "Salamandras a leña")
  //     .map((prod) => prod.subcategory)
  // );

  // const salamandrasLeñaSubcategories = Array.from(
  //   salamandrasLeñaSubcategoriesSet
  // ).map((subcategory) => ({ value: subcategory, label: subcategory }));

  // console.log(salamandrasLeñaSubcategories);

  const salamandrasLeñaSubcategoriesSet = new Set(
    allProducts
      .filter((prod) => prod.category === "Salamandras a leña")
      .map((prod) => prod.subcategory)
  );

  const salamandrasLeñaSubcategories = Array.from(
    salamandrasLeñaSubcategoriesSet
  ).map((subcategory) => ({ value: subcategory, label: subcategory }));

  const allSubcategories = salamandrasLeñaSubcategories.reduce(
    (result, subcategory) => {
      result.push(subcategory.value);
      return result;
    },
    []
  );

  salamandrasLeñaSubcategories.unshift({
    value: allSubcategories as any,
    label: "Todos",
  });

  const { allBrands, brandsFiltered } = useListBrands();
  const { selectedBrands, setSelectedBrands, setSelectedLines, selectedLines } =
    useFilterProducts();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number): void => {
    setOpen(open === value ? 0 : value);
  };

  const handleOrderConsults = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const type = e.target.value;
    dispatch(orderByConsults({ type }));
  };

  const handleOrderList = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(filterProductsBySubCategory(value));
  };

  return (
    <Card
      className={`shadow-none shadow-blue-gray-900/5 z-50 backdrop-blur-[2px] bg-white/80 h-full ${
        !openSidebar ? `hidden md:block` : `block`
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* className=
      {`absolute left-0 h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50 ${
        !openSidebar ? `hidden md:block` : `block`
      } backdrop-blur-[2px] bg-white/80 md:w-1/4 relative md:sticky md:top-0 top-32`} */}
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
        <MenuCheckbox
          items={brandsFiltered}
          isOpen={1}
          title={"Marcas"}
          open={open}
          handleOpen={handleOpen}
          setSelected={setSelectedBrands}
          selected={selectedBrands}
        />
        {/* 
              {allMatchCategory && (
                <SubMenu
                  items={salamandrasLeñaSubcategories}
                  handleChange={handleOrderList}
                  title={"Lineas"}
                  name={"filterSubcategory"}
                  identifier={0}
                />
              )} */}

        <Orders open={open} handleOpen={handleOpen} />
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
