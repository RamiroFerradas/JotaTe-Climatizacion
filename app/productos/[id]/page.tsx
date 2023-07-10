"use client";
import { addToCart } from "@/app/redux/slices/cart";
import { updateProduct } from "@/app/services/api";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { toastAddToCart } from "@/app/utilities/toastAddToCart";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import Chip from "@mui/material/Chip";

import { useDispatch } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import Drawer from "@mui/material/Drawer";

import {
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Card,
  Divider,
} from "@mui/material";

import { Button } from "@material-tailwind/react";
import { ImagesProduct } from "./components";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";
import { AppStore } from "@/app/redux/store";
import { formattedText } from "@/app/utilities/formattedText";
import { Loading } from "@/app/components";
import { fetchProductById } from "@/app/services/fetchProducts";
import { useProductList } from "@/app/hooks";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "../components";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  // const [loading, setloading] = useState(false);

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const fetchedProduct = await fetchProductById(id);
  //       setProduct(fetchedProduct);
  //     } catch (error) {
  //       console.error("Error al obtener el producto:", error);
  //     } finally {
  //       setloading(false);
  //     }
  //   };

  //   getProduct();
  // }, [id]);

  const { loading, allProducts } = useProductList();

  const selectedProduct = allProducts.find((_product) => _product.id === id);

  const isSalamandra =
    selectedProduct?.category === "Salamandras" &&
    selectedProduct.subcategory !== "Kits de combustion";
  const kitsCombustion = allProducts.filter(
    (p) => p.subcategory === "Kits de combustion"
  );
  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;
  const router = useRouter();

  const introText = "¡Hola! Estoy interesado/a en el siguiente producto:\n\n";
  const productText = `${selectedProduct?.name} - ${parseCurrency(
    Number(selectedProduct?.price)
  )}\n`;
  const text = introText + productText;

  const formattedDescription = formattedText(selectedProduct?.description);

  const addConsult = async () => {
    // AUMENTAR CONSULT DEL PRODCUTO AL CONSULTAR //
    const product = await fetchProductById(selectedProduct.id);
    if (!product) return;
    const newConsult =
      product.consults && parseInt(product.consults as string) + 1;
    const newData = { consults: newConsult };

    const produtcUpdate = await updateProduct(
      selectedProduct?.id,
      newData as any
    );
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
    if (zoom) {
      setZoom(false);
    } else {
      router.back();
    }
  };
  const [zoom, setZoom] = useState(false);

  return (
    <Drawer
      anchor={"right"}
      open={true}
      onClose={toggleDrawer()}
      className="min-h-screen w-scree"
    >
      <Card className="flex flex-col  md:max-w-3xl justify-between items-center px-0 h-full ove`rflow-y-auto md:w-full w-screen">
        <div className="overflow-y-auto w-full">
          {loading ? (
            <div className="w-[48vw] flex flex-col">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col gap-5 min-h-screen justify-between">
              <div>
                <button
                  onClick={toggleDrawer()}
                  className="absolute left-4 md:left-1 top-0 z-50"
                >
                  <KeyboardBackspaceIcon fontSize="large" />
                </button>
                <CardMedia className="h-full w-full">
                  <ImagesProduct
                    zoom={zoom}
                    setZoom={setZoom}
                    selectedProduct={selectedProduct}
                  />
                </CardMedia>
              </div>
              <div className="px-3 md:px-8">
                <div
                  className={`p-2 transition-all w-full flex justify-center items-start flex-col gap-5 ${
                    !zoom ? "block" : "md:hidden"
                  }`}
                >
                  <div className="h-1/6">
                    <Typography
                      variant="h5"
                      component="div"
                      className="font-black uppercase"
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
                    <Divider />
                  </div>

                  <div className="flex flex-col justify-center items-center flex-growh-auto w-full">
                    <ul className="w-full overflow-y-auto">
                      {formattedDescription?.map((linea, index) => (
                        <li key={index} className="mb-1">
                          <Typography variant="body2" color="text.secondary">
                            {linea}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Divider />
                </div>
                {isSalamandra && (
                  <div className={`w-full ${!zoom ? "block" : "md:hidden"}`}>
                    <Typography
                      variant="h6"
                      component="div"
                      className="font-semibold"
                    >
                      ¡Este producto requiere un kit de combustión, te mostramos
                      algunas de nuestras opciones!
                    </Typography>
                    <div className="flex flex-wrap gap-6 mt-2 justify-start items-center">
                      {kitsCombustion.map((kit, index) => (
                        <ProductCard key={kit.id} product={kit} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="sticky bottom-0">
                <CardActions>
                  <div className="w-full items-center flex justify-center gap-5">
                    <Button
                      className="flex w-full items-center gap-3 justify-center"
                      onClick={handleAddToCart}
                    >
                      <FaCartPlus className="h-5 w-5" />
                      <span className="hidden md:block">Agregar</span>
                    </Button>

                    <Button
                      color="green"
                      className="flex items-center gap-3 w-full justify-center"
                      onClick={handleConsultProduct}
                    >
                      <BsWhatsapp className="h-5 w-5" />
                      <span>Consultar</span>
                    </Button>
                  </div>
                </CardActions>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Drawer>
  );
};

export default ProductDetails;
