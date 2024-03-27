import { Dialog, IconButton, DialogContent, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef } from "react";
import Image from "next/image";
import wppLogo from "@/public/wpp.png";
type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const ModalPaymentApproved = ({ setOpenModal, openModal }: Props) => {
  const handleClose = () => {
    setOpenModal(false);
  };

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleOrderClickWhatsApp = () => {
    const phone = process.env.NEXT_PUBLIC_WPP_PHONE;

    const encodedText = "";
    const url = `https://wa.me/${phone}?text=${encodedText}`;

    window.open(url, "_blank");
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
      </IconButton>
      <DialogContent>
        <div className="min-h-[8rem] min-w-[17rem] flex flex-col justify-center items-center w-full p-6 text-center font-semibold">
          <p className="text-lg text-center mb-4">
            ¡Felicitaciones! Estás a un paso de obtener tu producto!
          </p>
          <p className="text-base mb-6">
            Completa tu compra comunicándote con un asesor a través de WhatsApp:
          </p>
          <button
            className="bg-[#26D366] text-white py-2 rounded-md hover:bg-[#1ca850] focus:outline-none focus:bg-[#1ca850] w-full"
            onClick={handleOrderClickWhatsApp}
          >
            <div className="flex justify-center items-center gap-3">
              <Image width={31} height={31} src={wppLogo} alt="WhatsApp Logo" />
              <span className="font-semibold">Comunicarse con un asesor</span>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ModalPaymentApproved;
