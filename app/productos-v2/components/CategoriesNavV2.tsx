import { Button, Menu, MenuItem } from "@mui/material";
import { useState, Fragment, useRef, useEffect } from "react";
import { Product } from "@/app/models";
import { useOnClickOutside } from "@/app/hooks/onClickOutsideRef";
import { FilterProductsBySubcategories } from "@/app/services/filters/FilterProductsBySubcategories";

type Props = {
  allProducts: Product[];
  setCategoryActive: (category: string) => void;
  categoryActive: string;
  categoriesSubCategories: { category: string; options: string[] }[];
  setSubCategoryActive: (subCategory: string) => void;
  setProductsFiltered: (products: Product[]) => void;
};
export default function CategoriesNavV2({
  setCategoryActive,
  categoryActive,
  categoriesSubCategories,
  setSubCategoryActive,
  setProductsFiltered,
  allProducts,
}: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleCloseAll = () => {
    setActiveMenu(null);
  };

  useOnClickOutside(menuRef, () => handleCloseAll());

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(category);
  };

  const handleClose = (e: any) => {
    const menu = document.getElementById("simple-menu")
      ?.children?.[2] as HTMLElement | null;

    if (menu) {
      const menuBoundary = {
        left: menu.offsetLeft,
        top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        right: menu.offsetLeft + menu.offsetWidth,
        bottom: menu.offsetTop + menu.offsetHeight,
      };

      if (
        e.clientX >= menuBoundary.left &&
        e.clientX <= menuBoundary.right &&
        e.clientY <= menuBoundary.bottom &&
        e.clientY >= menuBoundary.top
      ) {
        return;
      }
    }
    setActiveMenu(null);
  };

  const handleOptionClick = async (option: string) => {
    try {
      if (option == "Todos") {
        setProductsFiltered(allProducts);
        setCategoryActive("Todos");
      } else {
        const productsFilteres = await FilterProductsBySubcategories(option);
        setProductsFiltered(productsFilteres);
      }

      setSubCategoryActive(option);
    } catch (error) {
      console.error("Error al filtrar productos:", error.message);
    }
  };

  return (
    <nav className="bg-[#006d54] h-16 flex items-center w-full overflow-x-auto text-center px-4 md:justify-center">
      <div ref={menuRef} className="flex gap-5">
        <Button
          aria-owns={anchorEl ? `menu-all` : null}
          aria-haspopup="true"
          onMouseOver={handleCloseAll}
          onClick={() => handleOptionClick("Todos")}
          className="cursor-pointer"
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

        {categoriesSubCategories.map((categorySubcategory) => (
          <Fragment key={categorySubcategory.category}>
            <Button
              aria-owns={
                anchorEl ? `menu-${categorySubcategory.category}` : null
              }
              aria-haspopup="true"
              onMouseOver={(e) => handleOpen(e, categorySubcategory.category)}
            >
              <span
                className={`${
                  categorySubcategory.category === categoryActive
                    ? `text-[#ff6e25] font-black cursor-pointer`
                    : `text-[#f9f4f4] cursor-pointer hover:text-[#ff6e25] hover:font-black`
                }`}
              >
                {categorySubcategory.category}
              </span>
            </Button>
            <Menu
              ref={menuRef}
              id={`menu-${categorySubcategory.category}`}
              anchorEl={anchorEl}
              open={activeMenu === categorySubcategory.category}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              onClose={handleClose}
            >
              <ul>
                {categorySubcategory.options.map((option) => (
                  <MenuItem
                    key={option}
                    className="z-10"
                    onClick={(e) => {
                      handleOptionClick(option);
                      setCategoryActive(categorySubcategory.category);

                      handleClose(e);
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </ul>
            </Menu>
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
