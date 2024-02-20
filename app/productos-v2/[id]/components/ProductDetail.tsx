"use client";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { toastAddToCart } from "@/app/utilities/toastAddToCart";
import { Suspense, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import Drawer from "@mui/material/Drawer";

import {
  CardActions,
  CardMedia,
  Typography,
  Card,
  Divider,
} from "@mui/material";

import { Button } from "@material-tailwind/react";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { formattedText } from "@/app/utilities/formattedText";
import { useRouter, useSearchParams } from "next/navigation";
import ImagesProduct from "./ImagesProduct";
import { ProductCard } from "../../components";
import { CartProduct, Product } from "@/app/models";
import { useCart } from "../../context/CartContext";
import { updateConsults } from "@/app/services/crud/updateConsults";
import Link from "next/link";
import LoadingProduct from "../loading";

type Props = {
  selectedProduct: Product;
  recommendedProducts: Product[];
};
const ProductDetail = ({ selectedProduct, recommendedProducts }: Props) => {
  // const { conditionProduct } = useConditionProducts({
  //   selectedProduct,
  // });

  const { addToCart } = useCart();
  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;
  const router = useRouter();

  const searchParams = useSearchParams();
  const prevRoute = searchParams.get("prevRoute");

  const introText = "¡Hola! Estoy interesado/a en el siguiente producto:\n\n";
  const productText = `${selectedProduct?.name} - ${parseCurrency(
    Number(selectedProduct?.price)
  )}\n`;
  const text = introText + productText;

  const formattedDescription = formattedText(selectedProduct?.description);
  const addConsult = async () => {
    // Generar una clave única basada en el ID del producto
    const productKey = `consult_product_${selectedProduct.id}`;

    const hasAlreadyExecuted = Boolean(sessionStorage.getItem(productKey));

    if (!hasAlreadyExecuted) {
      const newConsult = parseInt(selectedProduct.consults as string) + 1;

      await updateConsults(selectedProduct.id, newConsult);

      sessionStorage.setItem(productKey, "true");
    }
  };
  useEffect(() => {
    return () => {
      addConsult();
    };
  }, []);

  const handleConsultProduct = () => {
    if (!selectedProduct) return;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encodedText}`;
    window.open(url, "_blank");

    // addConsult();
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct as CartProduct);
    toastAddToCart();
  };

  const backModal = () => () => {
    console.log(window.history.length);
    if (zoom) {
      setZoom(false);
    } else {
      if (prevRoute === "home") {
        router.push("/productos-v2");
      } else {
        router.back();
      }
    }
  };

  const [zoom, setZoom] = useState(false);
  return (
    <Card className="flex flex-col md:w-[48rem] justify-between items-center px-0 h-full overflow-y-auto w-screen fixed right-0">
      <div className="overflow-y-auto w-full">
        <div className="flex flex-col min-h-screen justify-between">
          <div>
            <button
              onClick={backModal()}
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
                  {selectedProduct?.brand as string}
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
            {recommendedProducts.length ? (
              <div className={`w-full ${!zoom ? "block" : "md:hidden"}`}>
                <Typography
                  variant="h6"
                  component="div"
                  className="font-semibold"
                >
                  ¡Agrega tambien alguna de estas opciones!
                </Typography>
                <div className="flex flex-wrap gap-6 mt-2 justify-start items-center">
                  {recommendedProducts.map((kit, index) => (
                    <Link
                      key={kit.id + index}
                      shallow
                      scroll={false}
                      href={`/productos-v2/${kit.id}`}
                    >
                      <ProductCard product={kit} />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className={!zoom ? "block mt-10" : "hidden"}>
              <Divider />
              <div className="flex justify-between items-center text-xl font-bold w-full ">
                <Typography
                  variant="h6"
                  component="div"
                  className="font-black "
                >
                  Precio
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  className="font-black uppercase"
                >
                  {parseCurrency(Number(selectedProduct?.price))}
                </Typography>
              </div>
            </div>
          </div>
          <div className={`sticky bottom-0 ${zoom ? "hidden" : ""}`}>
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
      </div>
    </Card>
  );
};

export default ProductDetail;
