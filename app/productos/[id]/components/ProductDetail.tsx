"use client";
import { addToCart } from "@/app/redux/slices/cart";
import { updateProduct } from "@/app/services/api";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { toastAddToCart } from "@/app/utilities/toastAddToCart";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { Loading } from "@/app/components";
import { fetchProductById } from "@/app/services/fetchProducts";
import { useConditionProducts, useProductList } from "@/app/hooks";
import { useParams, useRouter } from "next/navigation";
import ImagesProduct from "./ImagesProduct";
import { ProductCard } from "../../components";
import { updateProductsV2 } from "@/app/services/updateProduct";
import { Product } from "@/app/models";

type Props = {
  selectedProduct: Product;
};
const ProductDetail = ({ selectedProduct }: Props) => {
  const dispatch = useDispatch();

  const { conditionProduct } = useConditionProducts({
    selectedProduct,
  });
  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;
  const router = useRouter();

  const introText = "¡Hola! Estoy interesado/a en el siguiente producto:\n\n";
  const productText = `${selectedProduct?.name} - ${parseCurrency(
    Number(selectedProduct?.price)
  )}\n`;
  const text = introText + productText;

  const formattedDescription = formattedText(selectedProduct?.description);
  const addConsult = async () => {
    // Generar una clave única basada en el ID del producto
    const productKey = `consult_product_${selectedProduct.id}`;

    // Verificar si ya se ha ejecutado addConsult para este producto durante esta visita
    const hasAlreadyExecuted = sessionStorage.getItem(productKey);

    if (!hasAlreadyExecuted) {
      const newConsult = parseInt(selectedProduct.consults as string) + 1;
      const newData = { ...selectedProduct, consults: newConsult };

      await updateProductsV2([newData] as Product[]);

      // Establecer el indicador en sessionStorage para evitar futuras ejecuciones durante la misma visita
      sessionStorage.setItem(productKey, "true");
    }
  };
  useEffect(() => {
    addConsult();
  }, []);

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

  const backModal = () => () => {
    if (zoom) {
      setZoom(false);
    } else {
      router.back();
    }
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
      className="min-h-screen w-scree"
    >
      <Card className="flex flex-col md:w-[48rem] justify-between items-center px-0 h-full overflow-y-auto w-screen">
        <div className="overflow-y-auto w-full">
          {!selectedProduct ? (
            <div className="w-[48vw] flex flex-col">
              <Loading />
            </div>
          ) : (
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
                {conditionProduct && (
                  <div className={`w-full ${!zoom ? "block" : "md:hidden"}`}>
                    <Typography
                      variant="h6"
                      component="div"
                      className="font-semibold"
                    >
                      {conditionProduct.text}
                    </Typography>
                    <div className="flex flex-wrap gap-6 mt-2 justify-start items-center">
                      {conditionProduct.products.map((kit, index) => (
                        <ProductCard key={kit.id} product={kit} />
                      ))}
                    </div>
                  </div>
                )}
                <div className={!zoom ? "block mt-10" : "hidden"}>
                  <Divider />
                  <p className="flex justify-between items-center text-xl font-bold w-full ">
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
                  </p>
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
          )}
        </div>
      </Card>
    </Drawer>
  );
};

export default ProductDetail;
