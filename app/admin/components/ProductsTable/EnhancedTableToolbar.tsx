import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { Toolbar, Tooltip, alpha } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Percentage from "../Percentage";
import { Product } from "@/app/models";
import { Dispatch } from "react";
import { OptionType } from "@/app/models/OptionType";

interface EnhancedTableToolbarProps {
  numSelected: number;
  optionsBrands: OptionType[];
  selectedProducts: Product[];
  products: Product[];
  setFilteredProducts: Dispatch<React.SetStateAction<Product[]>>;
  setPage: Dispatch<React.SetStateAction<number>>;
  setSelected: Dispatch<React.SetStateAction<Product[]>>;
}

export default function EnhancedTableToolbar({
  numSelected,
  optionsBrands,
  selectedProducts,
  products,
  setFilteredProducts,
  setSelected,
  setPage,
}: EnhancedTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", font: "bold" }}
          variant="h6"
          id="tableTitle"
          component="div"
          className="hidden md:block"
        >
          Productos
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Percentage
          products={products}
          setSelected={setSelected}
          selectedProducts={selectedProducts}
          optionsBrands={optionsBrands}
          setFilteredProducts={setFilteredProducts}
          setPage={setPage}
        />
      )}
    </Toolbar>
  );
}
