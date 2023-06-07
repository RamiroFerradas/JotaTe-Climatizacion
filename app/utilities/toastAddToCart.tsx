import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

export const toastAddToCart = () =>
  toast("Producto agregado", {
    icon: <FaShoppingCart className="text-xl" />,
    style: {
      borderRadius: "10px",
      background: "#05c64ce9",
      color: "#fff",
      zIndex: 9999,
      position: "relative",
    },
  });
