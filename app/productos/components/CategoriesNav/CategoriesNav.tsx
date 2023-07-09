"use client";
import { useProductList } from "@/app/hooks";
import {
  filterProductsByCategory,
  filterProductsBySubCategory,
  selectCategory,
} from "@/app/redux/slices/products";
import { AppStore } from "@/app/redux/store";
import { Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export type CategoriesNavProps = {};

const CategoriesNav: React.FC<CategoriesNavProps> = () => {
  const { allProducts, loading } = useProductList();
  const dispatch = useDispatch();
  const uniqueCategories = allProducts
    .map((product) => product.category)
    .filter((category, index, array) => array.indexOf(category) === index)
    .map((category) => category.replace(" a leña", ""));

  const { categoryActive } = useSelector((state: AppStore) => state.products);
  console.log(categoryActive);
  // const [categoryActive, setCategoryActive] = useState("Todos");
  const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    // if (anchorEl[index] !== undefined) {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
    // }
  };

  const handleClose = (index: number, subcategory?: string, cat?: string) => {
    if (anchorEl[index] !== undefined) {
      const newAnchorEl = [...anchorEl];
      newAnchorEl[index] = null;
      setAnchorEl(newAnchorEl);

      if (cat) {
        dispatch(selectCategory(cat));
        if (cat.includes("Salamandras")) {
          dispatch(
            filterProductsByCategory(`${cat} ${subcategory?.toLowerCase()}`)
          );
        } else if (cat.includes("Parrillas")) {
          dispatch(filterProductsByCategory(`Parrillas ${subcategory}`));
        } else {
          dispatch(filterProductsBySubCategory(subcategory));
        }
      }
    }
  };

  const closeAllMenus = () => {
    const isOpen = anchorEl.some((el) => el !== null);
    if (isOpen) {
      const newAnchorEl = anchorEl.map(() => null);
      setAnchorEl(newAnchorEl);
    }
  };

  return (
    <nav
      className="bg-[#006d54] h-16 flex items-center w-full overflow-x-auto text-center px-4 md:justify-center"
      onClick={(e) => {
        e.stopPropagation();
        closeAllMenus();
      }}
    >
      {!loading && (
        <div className="flex gap-5">
          <Button
            onClick={() => {
              dispatch(filterProductsBySubCategory("Todos"));
              dispatch(selectCategory("Todos"));
            }}
          >
            <span
              className={`${
                "Todos" === categoryActive
                  ? `text-[#ff6e25] font-black cursor-pointer`
                  : `text-[#f9f4f4] cursor-pointer hover:text-[#ff6e25] hover:font-black`
              }`}
            >
              Todos
            </span>
          </Button>
          {uniqueCategories.map((cat, i) => {
            const submenu = allProducts.filter((prod) => prod.category === cat);
            const subcategoriesSet = new Set(
              submenu.map((prod) => prod.subcategory)
            );
            const open = Boolean(anchorEl[i]);
            const options =
              cat === "Salamandras"
                ? ["A leña", "A pellets"]
                : cat === "Parrillas"
                ? ["Fijas", "Móviles"]
                : Array.from(subcategoriesSet);

            return (
              <div key={i}>
                <Button
                  id={`basic-button-${i}`}
                  aria-controls={`basic-menu-${i}`}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => handleClick(event, i)}
                  onMouseEnter={(event) => {
                    closeAllMenus();
                    handleClick(event, i);
                  }}
                >
                  <span
                    key={i}
                    className={`${
                      cat === categoryActive
                        ? `text-[#ff6e25] font-black cursor-pointer`
                        : `text-[#f9f4f4] cursor-pointer hover:text-[#ff6e25] hover:font-black`
                    }`}
                  >
                    {cat}
                  </span>
                </Button>
                <Menu
                  id={`basic-menu-${i}`}
                  anchorEl={anchorEl[i]}
                  open={open}
                  onClose={() => handleClose(i)}
                  MenuListProps={{
                    "aria-labelledby": `basic-button-${i}`,
                    onMouseLeave: closeAllMenus,
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      onClick={() => handleClose(i, option, cat)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default CategoriesNav;
