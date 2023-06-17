"use client";

import { product } from "@/app/redux/slices";
import { addToCart } from "@/app/redux/slices/cart";
import { closeProductDetails, selectProduct } from "@/app/redux/slices/product";
import { AppStore } from "@/app/redux/store";
import { fetchProductById, updateProduct } from "@/app/services/api";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { toastAddToCart } from "@/app/utilities/toastAddToCart";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { IoIosCloseCircleOutline, IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ImagesProduct } from "../components/ProductDetails/ImagesProduct";
import { FaCartPlus } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import MercadoPagoButton from "./components/MercadoPagoButton";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";

import { CardActions, CardContent, CardMedia, Typography } from "@mui/material";
// import { Card } from "@material-tailwind/react";
import Card from "@mui/material/Card";
import useProductList from "@/app/hooks/useProductList";
import { Button } from "@material-tailwind/react";

type Props = {};
const ProductDetails = ({}: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(true);

  const { products } = useProductList();

  const selectedProduct = useMemo(
    () => products.find((_product) => _product.id === id),
    [products, id]
  );

  if (!selectedProduct) {
    return;
  }

  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;

  const router = useRouter();

  const introText = "¡Hola! Estoy interesado/a en el siguiente producto:\n\n";
  const productText = `${selectedProduct.name} - ${parseCurrency(
    Number(selectedProduct?.price)
  )}\n`;
  const text = introText + productText;

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

  const toggleDrawer = () => (event: React.KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (openDrawer) {
      router.push("/shop");
      setOpenDrawer(false);
    }
  };

  return (
    <Drawer anchor={"right"} open={openDrawer} onClose={toggleDrawer()}>
      <Card
        sx={{ width: 600, height: 1000 }}
        className="flex flex-col justify-start items-center"
      >
        <CardMedia>
          <ImagesProduct selectedProduct={selectedProduct} />
        </CardMedia>
        <CardContent>
          <div className="p-10">
            <Typography variant="h5" component="div" className="font-bold">
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
            <Typography variant="body2" color="text.secondary">
              {selectedProduct?.description}
            </Typography>
          </div>
        </CardContent>
        <CardActions className="flex w-full">
          <div className="w-full items-center  flex justify-around ">
            <Button
              className="flex items-center gap-3"
              onClick={handleAddToCart}
            >
              <FaCartPlus className="h-5 w-5" />
              <span className="hidden md:block">Agregar</span>
            </Button>

            <Button
              // variant="contained"
              color="green"
              className="flex items-center gap-3"
              onClick={handleConsultProduct}
            >
              <BsWhatsapp className="h-5 w-5" />
              <span>Consultar</span>
            </Button>
          </div>
          {/* <MercadoPagoButton selectedProduct={selectedProduct} /> */}
        </CardActions>
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
