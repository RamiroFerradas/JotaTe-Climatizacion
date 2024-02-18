import { Button, Menu, MenuItem } from "@mui/material";
import { useState, Fragment, useRef, useEffect } from "react";
import { Product } from "@/app/models";

type Props = {
  productsFiltered: Product[];
  allProducts: Product[];
  setCategoryActive: (category: string) => void;
  categoryActive: string;
  categoriesSubCategories: { category: string; options: string[] }[];
  setSubCategoryActive: (subCategory: string) => void;
  setProductsFiltered: (products: Product[]) => void;
};
export default function CategoriesNavV2({
  productsFiltered,
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
      <div ref={menuRef}>
        <Button
          aria-owns={anchorEl ? `menu-all` : null}
          aria-haspopup="true"
          onMouseOver={handleCloseAll}
          onClick={() => handleOptionClick("Todos")}
          style={{ zIndex: 1301 }}
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
              style={{ zIndex: 1301 }}
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
                  <li key={option}>
                    <MenuItem
                      onClick={(e) => {
                        handleOptionClick(option);
                        setCategoryActive(categorySubcategory.category);

                        handleClose(e);
                      }}
                    >
                      {option}
                    </MenuItem>
                  </li>
                ))}
              </ul>
            </Menu>
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
// "use client";
// import { Product } from "@/app/models";
// import { MouseEventHandler, useState } from "react";
// export type CategoriesNavProps = {};
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// // export default function CategoriesNavV2({}: Props) {
// //   return <div>CategoriesNavV2</div>;
// // }
// export default function CategoriesNavV2({
//   products,
//   setCategoryActive,
//   categoryActive,
// }: Props) {
//   // const { allProducts, loading } = useProductList();
//   // const dispatch = useDispatch();
//   const uniqueCategories = products
//     .map((product) => product.category)
//     .filter((category, index, array) => array.indexOf(category) === index);
//   // .map((category) => category.replace(" a leña", ""));
//   const loading = false;
//   // const { categoryActive } = useSelector((state: AppStore) => state.products);

//   // const [categoryActive, setCategoryActive] = useState("Todos");
//   const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>([]);

//   const handleClick = (
//     event: MouseEventHandler<HTMLButtonElement>,
//     index: number
//   ) => {
//     // if (anchorEl[index] !== undefined) {
//     const newAnchorEl = [...anchorEl];
//     newAnchorEl[index] = event.currentTarget;
//     setAnchorEl(newAnchorEl);
//     // }
//   };

//   const handleClose = (index: number, subcategory?: string, cat?: string) => {
//     if (anchorEl[index] !== undefined) {
//       const newAnchorEl = [...anchorEl];
//       newAnchorEl[index] = null;
//       setAnchorEl(newAnchorEl);

//       subcategory === "A leña" && (subcategory = "Salamandras a leña");

//       if (cat) {
//         // dispatch(selectCategory(cat));
//         // if (cat.includes("Salamandras")) {
//         //   dispatch(
//         //     filterProductsByCategory(`${cat} ${subcategory?.toLowerCase()}`)
//         //   );
//         // } else

//         if (cat.includes("Parrillas")) {
//           // dispatch(filterProductsByCategory(`Parrillas ${subcategory}`));
//         } else {
//           // dispatch(filterProductsBySubCategory(subcategory));
//         }
//       }
//     }
//   };

//   const closeAllMenus = () => {
//     const isOpen = anchorEl.some((el) => el !== null);
//     if (isOpen) {
//       const newAnchorEl = anchorEl.map(() => null);
//       setAnchorEl(newAnchorEl);
//     }
//   };

//   return (
//     <nav
//       className="bg-[#006d54] h-16 flex items-center w-full overflow-x-auto text-center px-4 md:justify-center"
//       onClick={(e) => {
//         e.stopPropagation();
//         closeAllMenus();
//       }}
//     >
//       {/* {!loading && (
//         <div className="flex gap-5">
//           <Button
//             onClick={() => {
//               // dispatch(filterProductsBySubCategory("Todos"));
//               // dispatch(selectCategory("Todos"));
//               // dispatch(selectSubCategory("Todos"));
//             }}
//           >
//             <span
//               className={`${
//                 "Todos" === categoryActive
//                   ? `text-[#ff6e25] font-black cursor-pointer`
//                   : `text-[#f9f4f4] cursor-pointer hover:text-[#ff6e25] hover:font-black`
//               }`}
//             >
//               Todos
//             </span>
//           </Button>
//           {uniqueCategories.map((cat, i) => {
//             const submenu = products.filter((prod) => prod.category === cat);
//             const subcategoriesSet = new Set(
//               submenu.map((prod) => (prod.subcategory as string).trim())
//             );
//             const open = Boolean(anchorEl[i]);
//             const options =
//               cat === "Salamandras"
//                 ? ["A leña", "A pellets", "Kits de combustion"]
//                 : cat === "Parrillas"
//                 ? ["Fijas", "Móviles"]
//                 : Array.from(subcategoriesSet);
//             return (
//               <div key={i} className="flex items-center justify-center">
//                 <Button
//                   id={`basic-button-${i}`}
//                   aria-controls={`basic-menu-${i}`}
//                   aria-haspopup="true"
//                   aria-expanded={open ? "true" : undefined}
//                   // onClick={(event) => {
//                   //   options.length > 1
//                   //     ? handleClick(event, i)
//                   //     : dispatch(filterProductsByCategory(cat));
//                   // }}
//                   onMouseEnter={(event) => {
//                     closeAllMenus();
//                     handleClick(event, i);
//                   }}
//                 >
//                   <span
//                     key={i}
//                     className={`${
//                       cat === categoryActive
//                         ? `text-[#ff6e25] font-black cursor-pointer`
//                         : `text-[#f9f4f4] cursor-pointer hover:text-[#ff6e25] hover:font-black`
//                     }`}
//                   >
//                     {cat as string}
//                   </span>
//                 </Button>
//                 {options.length > 1 && (
//                   <Menu
//                     id={`basic-menu-${i}`}
//                     anchorEl={anchorEl[i]}
//                     open={open}
//                     onClose={() => handleClose(i)}
//                     MenuListProps={{
//                       "aria-labelledby": `basic-button-${i}`,
//                       onMouseLeave: closeAllMenus,
//                     }}
//                   >
//                     {options.map((option) => (
//                       <MenuItem
//                         key={option}
//                         onClick={() => handleClose(i, option, cat as string)}
//                       >
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Menu>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )} */}
//     </nav>
//   );
// }
import { createTheme } from "@mui/material/styles";
import { useOnClickOutside } from "@/app/hooks/onClickOutsideRef";
import { FilterProductsBySubcategories } from "@/app/services/filters/FilterProductsBySubcategories";
import { selectSubCategory } from "@/app/redux/slices/products";
