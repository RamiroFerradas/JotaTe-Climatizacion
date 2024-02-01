"use client";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import CreatableSelect from "react-select/creatable";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import { Product } from "@/app/models";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import { stableSort } from "./helpers/stableSort";
import { createDataFromAPI } from "./helpers/createDataFromAPI";
import { isSelected } from "./helpers/isSelected";
import { getComparator } from "./helpers/getComparator";
import { Alert, Input, Snackbar, TextField } from "@mui/material";
import { Loading } from "@/app/components";
import SearchBar from "../Searchbar";
import ButtonLogout from "../ButtonLogout";
import jotaTeLogo from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
  optionsSubcategory: { label: string; key: string }[];
  optionsCategory: { label: string; key: string }[];
  optionsBrands: { label: string; key: string }[];
  handleUpdateProducts: (
    existingProducts: Product[],
    productsToUpdate: Product[]
  ) => Promise<void>;
};
type Order = "asc" | "desc";

export default function ProductsTable({
  products,
  optionsSubcategory,
  optionsBrands,
  optionsCategory,
  handleUpdateProducts,
}: Props) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Product>("brand");
  const [selected, setSelected] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [viewAlert, setViewAlert] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const rows = (filteredProducts.length > 0 ? filteredProducts : products).map(
    (item: Product) => createDataFromAPI(item)
  );

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClickRow = (newProduct: Product, onlySelected?: boolean) => {
    const isProductSelected = selected.some(
      (product) => product.id === newProduct.id
    );

    if (isProductSelected) {
      const updatedSelected = selected.filter(
        (product) => product.id !== newProduct.id
      );
      !onlySelected && setSelected(updatedSelected);
    } else {
      setSelected((prevSelected) => [...prevSelected, newProduct]);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(rows as any[], getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, products, filteredProducts, selected]
  );

  const updateProductInSelected = (
    prevSelected: Product[],
    productId: string,
    updateProps: any
  ) =>
    prevSelected.map((product: Product) =>
      product.id === productId ? { ...product, ...updateProps } : product
    );

  const handleSubmit = async () => {
    if (!selected || selected.length === 0) return;
    setLoading(true);
    setError("");
    try {
      await handleUpdateProducts(products, selected);
      setViewAlert(true);
      setSelected([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      setViewAlert(true);
      setError(error.message);
    }

    setSelected([]);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setViewAlert(false);
  };

  const defaultvalueNewPrice = (row: Product) => {
    return (
      selected.find((product: Product) => product.id === row.id)?.newPrice ||
      products.find((product: Product) => product.id === row.id).price
    );
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900 w-full py-1">
          <Link href={"/"}>
            <Image
              src={jotaTeLogo}
              alt="logo_jota_te"
              width={130}
              height={130}
              className="cursor-pointer"
            />
          </Link>
          <SearchBar
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="rounded bg-[#F65B36] border border-[#F65B36] hidden lg:inline-block"
            >
              <span>Nuevo</span>
            </Button>
            <Button
              size="sm"
              className="rounded bg-[#006d54] border border-[#006d54] hidden lg:inline-block"
              onClick={handleSubmit}
            >
              <span>Guardar cambios</span>
            </Button>
            ´
            <ButtonLogout />
          </div>
        </div>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            products={products}
            setSelected={setSelected}
            selectedProducts={selected}
            optionsBrands={optionsBrands}
            setFilteredProducts={setFilteredProducts}
            setPage={setPage}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(selected, row.id as string);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClickRow(row as any)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.brand}</TableCell>
                      <TableCell align="right">
                        <div onClick={(e) => e.stopPropagation()}>
                          <CreatableSelect
                            isClearable
                            options={optionsCategory as any}
                            className="w-44"
                            defaultValue={optionsCategory.find(
                              (op) => op.key === row.category
                            )}
                            onMenuOpen={() => handleClickRow(row, true)}
                            onMenuClose={() => handleClickRow(row, true)}
                            onChange={(e) => {
                              console.log(e.key);
                              setSelected((prevProducts) =>
                                updateProductInSelected(prevProducts, row.id, {
                                  category: e.label,
                                })
                              );
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div onClick={(e) => e.stopPropagation()}>
                          <CreatableSelect
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 0,
                              colors: {
                                ...theme.colors,
                                primary25: "black",
                                // primary: "black",
                              },
                            })}
                            isClearable
                            options={optionsSubcategory as any}
                            className="w-44"
                            defaultValue={optionsSubcategory.find(
                              (op) => op.key === row.subcategory
                            )}
                            onMenuOpen={() => handleClickRow(row, true)}
                            onMenuClose={() => handleClickRow(row, true)}
                            onChange={(e) => {
                              setSelected((prevProducts) =>
                                updateProductInSelected(prevProducts, row.id, {
                                  subcategory: e.label,
                                })
                              );
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClickRow(row, true);
                          }}
                          defaultChecked={Boolean(
                            products.find(
                              (product: Product) => product.id === row.id
                            )?.destacado
                          )}
                          onChange={(e) => {
                            const { checked } = e.target;
                            setSelected((prevProducts) =>
                              updateProductInSelected(prevProducts, row.id, {
                                destacado: checked,
                              })
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">
                        <TextField
                          // label="Nuevo precio"
                          id="newPrice"
                          type="number"
                          defaultValue={defaultvalueNewPrice(row)}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClickRow(row, true);
                          }}
                          onChange={(e) => {
                            const newPrice = e.target.value;
                            setSelected((prevProducts) =>
                              updateProductInSelected(prevProducts, row.id, {
                                price: newPrice,
                              })
                            );
                          }}
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <></>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={viewAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity={!error ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {!error
            ? selected.length < 1
              ? `Productos actualizados`
              : `Producto actualizado`
            : `Error al actualizar producto: ${error}`}
        </Alert>
      </Snackbar>
    </>
  );
}
