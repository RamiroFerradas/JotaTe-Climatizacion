import {
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
} from "@mui/material";
import { forwardRef, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { CartProduct } from "@/app/models";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { Wallet } from "@mercadopago/sdk-react";
import { TransitionProps } from "@mui/material/transitions";
import { PreferenceMP } from "@/app/models/PreferenceMP";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  preference: PreferenceMP;
};
function ModalCheckout({ openModal, setOpenModal, preference }: Props) {
  const { cart } = useCart();

  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;
  const totalPriceCart = parseCurrency(
    cart.reduce((acc: number, product: CartProduct) => {
      if (product.quantity && product.price) {
        return acc + Number(product.quantity) * Number(product.price);
      }
      return acc;
    }, 0)
  );
  const text = useMemo(() => {
    const introText =
      "¡Hola! Estoy interesado/a en los siguientes productos:\n\n";
    const productText = cart.reduce(
      (message: string, product: CartProduct) =>
        message.concat(
          `- ${product.name} (${product.quantity ?? 0} unidades) - $${
            Number(product.price) * (Number(product.quantity) ?? 0)
          }\n`
        ),
      ""
    );

    const totalText = `El total es: ${totalPriceCart}`;

    return introText + productText + "\n" + totalText;
  }, [cart]);
  const handleOrderClickWhatsApp = () => {
    if (!cart.length) return;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encodedText}`;

    window.open(url, "_blank");
  };

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog
      open={openModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>{" "}
      <DialogContent>
        <div className="min-h-[8rem] min-w-[17rem] flex flex-col justify-center items-start min-hcreen w-full">
          {/* <button
            disabled={!cart.length}
            className="bg-[#26D366] text-white py-2 rounded-md hover:bg-[#1ca850] focus:outline-none focus:bg-[#1ca850] w-full"
          >
            <div className="flex justify-center items-center gap-3">
              <Image width={31} height={31} src={wppLogo} alt="wpp logo" />
              <span
                className="font-semibold"
                onClick={handleOrderClickWhatsApp}
              >
                Completar via WhatsApp
              </span>
            </div>
          </button> */}
          {preference ? (
            <Wallet
              locale="es-AR"
              initialization={{
                preferenceId: preference?.id,
                redirectMode: "blank",
              }}
            />
          ) : (
            <div className="w-full flex justify-center items-center">
              <CircularProgress size={45} color="success" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ModalCheckout;
