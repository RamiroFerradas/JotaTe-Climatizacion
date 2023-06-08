import { Fragment, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AppStore } from "@/app/redux/store";
import { closeProductDetails } from "@/app/redux/slices/product";
import { useDispatch } from "react-redux";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { addToCart } from "@/app/redux/slices/cart";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsWhatsapp } from "react-icons/bs";
import { ImagesProduct } from "./ImagesProduct";
import { toastAddToCart } from "@/app/utilities/toastAddToCart";
import { fetchProductById, updateProduct } from "@/app/services/api";

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;

  const { selectedProduct, openModal } = useSelector(
    (state: AppStore) => state.product
  );

  const dispatch = useDispatch();

  const introText = "¡Hola! Estoy interesado/a en el siguiente producto:\n\n";
  const productText = `${selectedProduct.name} - ${parseCurrency(
    Number(selectedProduct.price)
  )}\n`;
  const text = introText + productText;

  const addConsult = async () => {
    // AUMENTAR CONSULT DEL PRODCUTO AL CONSULTAR //
    const product = await fetchProductById(selectedProduct.id);
    if (!product) return;
    const newConsult = product.consults && parseInt(product.consults) + 1;
    const newData = { consults: parseInt(newConsult) };
    const produtcUpdate = await updateProduct(selectedProduct.id, newData);
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

  const AMOUNT: number = 30000;
  return (
    <Fragment>
      <Dialog
        size="xl"
        className="p-2 relative z-10"
        open={openModal}
        handler={() => dispatch(closeProductDetails())}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="flex justify-between px-4 gap-0 relative">
          <div>
            <DialogHeader className="px-0">{selectedProduct.name}</DialogHeader>
            <Typography>{selectedProduct.brand}</Typography>
          </div>
          <div className="mt-2 absolute right-1 top-0">
            <button onClick={() => dispatch(closeProductDetails())}>
              <IoIosCloseCircleOutline className="h-7 w-7 text-red-500" />
            </button>
          </div>
        </div>

        <ImagesProduct selectedProduct={selectedProduct} />

        <DialogFooter className="flex justify-center md:justify-end p-1 md:px-4 md:py-2 gap-2">
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
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default ProductDetails;
