"use client";
import useProductList from "@/app/hooks/useProductList";
import { filterProductsBySubCategory } from "@/app/redux/slices/products";
import { Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
export type CategoriesNavProps = {};

const CategoriesNav: React.FC<CategoriesNavProps> = () => {
  const { allProducts, loading } = useProductList();
  const dispatch = useDispatch();

  const uniqueCategories = [];
  const categoriesSet = new Set();
  allProducts.forEach((product) => {
    if (!categoriesSet.has(product.category)) {
      categoriesSet.add(product.category);
      uniqueCategories.push(product.category);
    }
  });

  const [categoryActive, setCategoryActive] = useState("Todos");
  const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleClose = (index: number, subcategory?: string, cat?: string) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
    subcategory && dispatch(filterProductsBySubCategory(subcategory));
    cat && setCategoryActive(cat);
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
              setCategoryActive("Todos");
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
                  {Array.from(subcategoriesSet).map((subcategory) => (
                    <MenuItem
                      key={subcategory}
                      onClick={() => handleClose(i, subcategory, cat)}
                    >
                      {subcategory}
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
