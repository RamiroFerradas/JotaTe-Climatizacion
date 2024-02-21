import { Chip, ListItemSuffix } from "@material-tailwind/react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
};
export default function CartIcon({ setOpenSidebar }: Props) {
  const { cart, toggleCartMenu } = useCart();
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative inline-block mt-3 cursor-pointer mr-5 ">
      <button
        className={`flex-col flex justify-center hover:text-[#006d54] transition-all items-center`}
        onClick={(e) => {
          e.stopPropagation();
          setOpenSidebar(false);
          toggleCartMenu();
        }}
      >
        <ListItemSuffix>
          <Chip
            value={totalQuantity}
            size="sm"
            color="red"
            className="rounded-full absolute"
          />
        </ListItemSuffix>
        <FaShoppingCart className="text-xl" />

        <p>Carrito</p>
      </button>
    </div>
  );
}
