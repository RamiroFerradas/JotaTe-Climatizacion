"use client";
import { addToCart } from "@/app/redux/slices/cart";
import { fetchProductById, updateProduct } from "@/app/services/api";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { toastAddToCart } from "@/app/utilities/toastAddToCart";

import { useParams, useRouter } from "next/navigation";
import { MouseEventHandler, KeyboardEvent, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import Drawer from "@mui/material/Drawer";

import { CardActions, CardContent, CardMedia, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import useProductList from "@/app/hooks/useProductList";
import { Button } from "@material-tailwind/react";
import { ImagesProduct } from "./components";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(true);

  const { products } = useProductList();
  const selectedProduct = products.find((_product) => _product.id === id);

  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;

  const router = useRouter();

  const introText = "¡Hola! Estoy interesado/a en el siguiente producto:\n\n";
  const productText = `${selectedProduct?.name} - ${parseCurrency(
    Number(selectedProduct?.price)
  )}\n`;
  const text = introText + productText;

  const formattedDescription = selectedProduct?.description
    .replace(/mm/g, " mm\n")
    .replace(/cm/g, " cm\n")
    .replace(/kg/g, " kg\n")
    .replace(/m²/g, " m²\n")
    .split("\n");

  // Renderizamos las líneas formateadas

  const addConsult = async () => {
    // AUMENTAR CONSULT DEL PRODCUTO AL CONSULTAR //
    const product = await fetchProductById(selectedProduct.id);
    if (!product) return;
    const newConsult =
      product.consults && parseInt(product.consults as string) + 1;
    const newData = { consults: newConsult };

    const produtcUpdate = await updateProduct(selectedProduct?.id, newData);
    // AUMENTAR CONSULT DEL PRODCUTO AL CONSULTAR //
  };

  const handleConsultProduct = () => {
    if (!selectedProduct) return;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encodedText}`;
    window.open(url, "_blank");

    // addConsult();
  };

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
    toastAddToCart();
  };

  const toggleDrawer = () => () => {
    if (openDrawer) {
      if (zoom) {
        setZoom(false);
      } else {
        router.push("/shop");
        setOpenDrawer(false);
      }
    }
  };
  const [zoom, setZoom] = useState(false);

  return (
    <Drawer
      anchor={"right"}
      open={openDrawer}
      onClose={toggleDrawer()}
      className="h-screen overflow-y-auto"
    >
      <Card
        // sx={{ height: 1000 }}
        className="flex flex-col w-screen md:max-w-3xl justify-between items-center px-10 h-full overflow-y-auto"
      >
        <div className="w-full h-2/6 mb-10">
          <button
            onClick={toggleDrawer()}
            className="absolute left-4 md:left-1 top-1 z-50"
          >
            <KeyboardBackspaceIcon fontSize="large" />
          </button>
          <CardMedia className="h-full">
            <ImagesProduct
              zoom={zoom}
              setZoom={setZoom}
              selectedProduct={selectedProduct}
            />
          </CardMedia>
        </div>

        <div
          className={`p-2 transition-all w-full h-3/6 flex justify-center items-start flex-col gap-5 ${
            !zoom ? "block" : "md:hidden"
          }`}
        >
          <div className="h-1/6">
            <Typography
              variant="h5"
              component="div"
              className="font-bold uppercase "
            >
              {selectedProduct?.name}
            </Typography>

            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="text-gray-600"
            >
              {selectedProduct?.brand}
            </Typography>
          </div>

          <div className="flex flex-col justify-center items-center flex-grow overflow-y-auto h-5/6 w-full">
            <ul className="w-full overflow-y-auto">
              {formattedDescription?.map((linea, index) => (
                <li key={index}>
                  <Typography variant="body2" color="text.secondary">
                    {linea}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`w-full ${!zoom ? "block" : "md:hidden"}`}>
          <CardActions>
            <div className="w-full items-center flex justify-around gap-5">
              <Button
                className="flex w-full items-center gap-3 justify-center"
                onClick={handleAddToCart}
              >
                <FaCartPlus className="h-5 w-5" />
                <span className="hidden md:block">Agregar</span>
              </Button>

              <Button
                // variant="contained"
                color="green"
                className="flex items-center gap-3 w-full justify-center"
                onClick={handleConsultProduct}
              >
                <BsWhatsapp className="h-5 w-5" />
                <span>Consultar</span>
              </Button>
            </div>
            {/* <MercadoPagoButton selectedProduct={selectedProduct} /> */}
          </CardActions>
        </div>
      </Card>
    </Drawer>

    // <div
    //   className="p-2 fixed w-full z-50 bg-[#00000066] h-full right-0 flex justify-end top-0"
    //   onClick={() => dispatch(closeProductDetails())}

    // animate={{
    //   mount: { scale: 1, y: 0 },
    //   unmount: { scale: 0.9, y: -100 },
    // }}

    /* <div className="flex flex-col bg-white right-0 relative translate-x-0 transition-all max-w-lg h-full w-full">
        <div className="flex justify-between px-4 gap-0 relative">
          <div className="mt-2 top-0">
            <Link href="/shop">
              <IoMdArrowBack className="h-8 w-8 border text-gray-600 border-gray-600/50 p-1" />
            </Link>
          </div>
          <div>
            <div className="px-0">{selectedProduct.name}</div>
            <Typography>{selectedProduct.brand}</Typography>
          </div>
        </div>

        <ImagesProduct selectedProduct={selectedProduct} />

        <div className="flex justify-center md:justify-end p-1 md:px-4 md:py-2 gap-2">
          <MercadoPagoButton selectedProduct={selectedProduct} />
          <Button className="flex items-center gap-3" onClick={handleAddToCart}>
            <FaCartPlus className="h-5 w-5" />
            <span className="hidden md:block">Agregar</span>
          </Button>

          <Button
            variant="gradient"
            color="green"
            className="flex items-center gap-3"
            onClick={handleConsultProduct}
          >
            <BsWhatsapp className="h-5 w-5" />
            <span>Consultar</span>
          </Button>
        </div> 
      </div>*/

    // </div>
  );
};

export default ProductDetails;
