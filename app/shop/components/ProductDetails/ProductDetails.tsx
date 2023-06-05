import { Fragment, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AppStore } from "@/app/redux/store";
import product, { closeProductDetails } from "@/app/redux/slices/product";
import { useDispatch } from "react-redux";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import Image from "next/image";
import { addToCart } from "@/app/redux/slices/cart";

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
        open={openModal}
        handler={() => dispatch(closeProductDetails())}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="flex justify-between items-center px-2 flex-col md:flex-row md:px-4">
          <DialogHeader className="px-0 ">{selectedProduct.name}</DialogHeader>
          <Typography>{selectedProduct.brand}</Typography>
        </div>

        <DialogBody divider>
          <div className="flex items-center mb-4 flex-col md:flex-row">
            <div className="md:w-1/2">
              <Image
                width={400}
                height={400}
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="mr-8"
              />
            </div>
            <div className="md:w-1/2 h-40 overflow-y-auto">
              {/* <h2 className="text-lg font-medium">{selectedProduct?.name}</h2> */}
              <p>{selectedProduct.description}</p>
              <p className="text-gray-600 text-lg text-end">
                {parseCurrency(Number(selectedProduct.price))}
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between p-1 md:px-4 md:py-2">
          <div>
            <Button
              className="flex items-center gap-3"
              onClick={() => dispatch(addToCart(selectedProduct))}
            >
              <FaCartPlus className="h-5 w-5" />
              <span className="hidden md:block">Agregar</span>
            </Button>
          </div>
          <div>
            <Button
              color="red"
              onClick={() => dispatch(closeProductDetails())}
              className="mr-1"
            >
              <span>Cerrar</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOrderClick}>
              <span>Consultar</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default ProductDetails;
