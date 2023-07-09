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

import { CardActions, CardMedia, Typography, Chip, Card } from "@mui/material";

import { Button } from "@material-tailwind/react";
import { ImagesProduct } from "./components";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";
import { AppStore } from "@/app/redux/store";
import { formattedText } from "@/app/utilities/formattedText";
import { Loading } from "@/app/components";
import { fetchProductById } from "@/app/services/fetchProducts";
import { useProductList } from "@/app/hooks";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setloading] = useState(false);

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

  const { products } = useProductList();
  const selectedProduct = products.find((_product) => _product.id === id);
  // const selectedProduct = product;

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
      router.push("/productos");
    }
  };
  const [zoom, setZoom] = useState(false);

  return (
    <Drawer
      anchor={"right"}
      open={true}
      onClose={toggleDrawer()}
      className="h-screen overflow-y-auto"
    >
      <Card className="flex flex-col w-screen md:max-w-3xl justify-between items-center px-10 h-full overflow-y-auto">
        {loading ? (
          <Loading />
        ) : (
          <>
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
                    <li key={index} className="mb-2">
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
                    {/* <Chip label={`${cart.length} productos`} /> */}
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
          </>
        )}
      </Card>
    </Drawer>
  );
};

export default ProductDetails;