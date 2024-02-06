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
import { Alert, Modal, Slide, SlideProps, Snackbar } from "@mui/material";
import { Loading } from "@/app/components";
import SearchBar from "../Searchbar";
import ButtonLogout from "../ButtonLogout";
import jotaTeLogo from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté nombre1.png";
import jotaTeLogoResponsive from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté logotipo1.png";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import FormCreateProduct from "../CreateProduct/FormCreateProduct";
import { selectStyles } from "../../StylesSelect";
import { IoMdAddCircleOutline, IoMdSave } from "react-icons/io";
import { useScreenSize } from "@/app/hooks";

type Props = {
  products: Product[];
  optionsSubcategory: { label: string; value: string }[];
  optionsCategory: { label: string; value: string }[];
  optionsBrands: { label: string; value: string }[];
  handleUpdateProducts: (
    existingProducts: Product[],
    productsToUpdate: Product[]
  ) => Promise<Product[]>;
};
type Order = "asc" | "desc";

export default function ProductsTable({
  products,
  optionsSubcategory,
  optionsBrands,
  optionsCategory,
  handleUpdateProducts,
}: Props) {
  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Product>("brand");
  const [selected, setSelected] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [openModalForm, setOpenModalForm] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const rows = (filteredProducts.length > 0 ? filteredProducts : products).map(
    (item: Product) => createDataFromAPI(item)
  );
  const { width } = useScreenSize();
  const isMobile = width < 720;
  const logoResponsive = isMobile ? jotaTeLogoResponsive : jotaTeLogo;
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
      const response: Product[] = await handleUpdateProducts(
        products,
        selected
      );

      // Verifica si hay productos filtrados
      if (filteredProducts.length > 0) {
        // Actualiza los productos filtrados en función de la respuesta
        const updatedFilteredProducts: Product[] = filteredProducts.map(
          (filteredProduct: Product) => {
            // Supongamos que hay un identificador único llamado 'id' en los productos
            const updatedProduct: Product | undefined = response.find(
              (updatedProduct) => updatedProduct.id === filteredProduct.id
            );

            // Si se encuentra el producto actualizado, lo devuelve; de lo contrario, mantiene el producto filtrado original
            return updatedProduct || filteredProduct;
          }
        );

        // Actualiza el estado de los productos filtrados
        setFilteredProducts(updatedFilteredProducts);
        const message =
          selected.length < 1
            ? "Productos actualizados"
            : "Producto actualizado";
        setSnackBarMessage(message);
      }
    } catch (error) {
      setError(error.message);
      setSnackBarMessage(error.message);
    } finally {
      setLoading(false);
      setSelected([]);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarMessage("");
  };

  const defaultvalueNewPrice = (row: Product) => {
    return selected.find((product: Product) => product.id === row.id)?.newPrice;
  };

  return (
    <div className="flex flex-col gap-3 px-1 md:px-4 relative overflow-hidden max-w-[100vw]">
      <Box sx={{ width: "100%" }}>
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900 w-screen py-1 n">
          <Link href={"/"}>
            <Image
              src={logoResponsive}
              alt="logo_jota_te"
              width={!isMobile ? 130 : 50}
              height={!isMobile ? 130 : 50}
              className="cursor-pointer"
            />
          </Link>
          <SearchBar
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
          <div className="flex gap-1 md:gap-2 justify-center items-center">
            <Button
              size="sm"
              className="hidden md:block rounded bg-[#F65B36] border border-[#F65B36]  "
              onClick={() => setOpenModalForm(true)}
            >
              <span className="hidden md:block">Nuevo prodcuto</span>
              <IoMdAddCircleOutline size={24} className="block md:hidden" />
            </Button>
            <Button
              size="sm"
              className="rounded bg-[#006d54] border border-[#006d54] "
              onClick={handleSubmit}
            >
              <span className="hidden md:block">Guardar cambios</span>
              <IoMdSave size={24} className="block md:hidden" />
            </Button>

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
          <TableContainer className="w-full">
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
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell className="w-2/12" padding="checkbox">
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
                        className="w-2/12"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell className="w-2/12" align="left">
                        {row.brand}
                      </TableCell>
                      <TableCell className="w-2/12" align="left">
                        <div
                          className="min-w-[10rem]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CreatableSelect
                            isClearable
                            className="w-full"
                            options={optionsCategory as any}
                            defaultValue={optionsCategory.find(
                              (op: any) => op.value === row.category
                            )}
                            onMenuOpen={() => handleClickRow(row, true)}
                            onMenuClose={() => handleClickRow(row, true)}
                            onChange={(e) => {
                              setSelected((prevProducts) =>
                                updateProductInSelected(prevProducts, row.id, {
                                  category: e ? e.label : row.category,
                                })
                              );
                            }}
                            styles={selectStyles(false)}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="w-2/12" align="left">
                        <div
                          className="min-w-[10rem]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CreatableSelect
                            className="w-full"
                            styles={selectStyles(false)}
                            isClearable
                            options={optionsSubcategory as any}
                            defaultValue={optionsSubcategory.find(
                              (op: any) => op.value === row.subcategory
                            )}
                            onMenuOpen={() => handleClickRow(row, true)}
                            onMenuClose={() => handleClickRow(row, true)}
                            onChange={(e) => {
                              setSelected((prevProducts) =>
                                updateProductInSelected(prevProducts, row.id, {
                                  subcategory: e ? e.label : row.subcategory,
                                })
                              );
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="w-1/12" align="left">
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
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell className="w-2/12" align="left">
                        {row.price}
                      </TableCell>
                      <TableCell className="w-2/12" align="left">
                        <input
                          className={
                            "border border-green-principal p-2 rounded-md w-24 h- "
                          }
                          placeholder={"Nuevo precio"}
                          id="newPrice"
                          type="number"
                          defaultValue={defaultvalueNewPrice(row)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClickRow(row, true);
                          }}
                          onChange={(e) => {
                            const newPrice = e.target.value;
                            setSelected((prevProducts) =>
                              updateProductInSelected(prevProducts, row.id, {
                                newPrice: newPrice,
                              })
                            );
                          }}
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
      <Modal open={openModalForm} onClose={() => setOpenModalForm(false)}>
        <div className="flex justify-center items-start min-h-screen m-5">
          <FormCreateProduct
            optionsCategory={optionsCategory}
            optionsBrands={optionsBrands}
            optionsSubcategory={optionsSubcategory}
            setOpenModalForm={setOpenModalForm}
            setSnackBarMessage={setSnackBarMessage}
            setErrorSnackBar={setError}
          />
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!snackBarMessage}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity={!error ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
