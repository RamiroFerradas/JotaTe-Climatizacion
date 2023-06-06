import { Fragment, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Carousel,
  IconButton,
} from "@material-tailwind/react";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AppStore } from "@/app/redux/store";
import product, { closeProductDetails } from "@/app/redux/slices/product";
import { useDispatch } from "react-redux";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import Image from "next/image";
import { addToCart } from "@/app/redux/slices/cart";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { BsWhatsapp } from "react-icons/bs";
import { ImagesProduct } from "./ImagesProduct";

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;

  const { selectedProduct, openModal } = useSelector(
    (state: AppStore) => state.product
  );

  const dispatch = useDispatch();

  const text = useMemo(() => {
    const introText = "¡Hola! Estoy interesado/a en el siguiente producto:\n\n";
    const productText = `${selectedProduct.name} - ${parseCurrency(
      Number(selectedProduct.price)
    )}\n`;

    return introText + productText;
  }, [selectedProduct]);

  const handleOrderClick = () => {
    if (!selectedProduct) return;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encodedText}`;

    window.open(url, "_blank");
  };
  return (
    <Fragment>
      <Dialog
        size="xl"
        className="p-2"
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
          <Button
            className="flex items-center gap-3"
            onClick={() => dispatch(addToCart(selectedProduct))}
          >
            <FaCartPlus className="h-5 w-5" />
            <span className="hidden md:block">Agregar</span>
          </Button>

          <Button
            variant="gradient"
            color="green"
            className="flex items-center gap-3"
            onClick={handleOrderClick}
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
