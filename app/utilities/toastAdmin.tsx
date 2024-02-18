import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export const toastOkAdmin = (text: string) =>
  toast(text, {
    icon: <FaCheck className="text-xl" />,
    style: {
      borderRadius: "10px",
      background: "#05c64ce9",
      color: "#fff",
      zIndex: 9999,
      position: "relative",
    },
  });
export const toastErrorAdmin = (text: string) =>
  toast(text, {
    icon: <MdErrorOutline className="text-xl" />,
    style: {
      borderRadius: "10px",
      background: "#ff3916",
      color: "#fff",
      zIndex: 9999,
      position: "relative",
    },
  });
