import { closeMenuCart, openMenuCart } from "@/app/redux/slices/cart";
import { AppStore } from "@/app/redux/store";
import { Chip, ListItemSuffix } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export type Props = {
  // setopenSidebar: Dispatch<SetStateAction<boolean>>;
  showCartMenu: any;
};
export default function CartIcon({}: Props) {
  const { cart, open } = useSelector((state: AppStore) => state.cart);

  const dispatch = useDispatch();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        !open ? dispatch(openMenuCart()) : dispatch(closeMenuCart());
        // setopenSidebar(false);
      }}
      className="relative inline-block mt-1 cursor-pointer mr-5"
    >
      <button
        className={`flex-col flex justify-center hover:text-[#006d54] transition-all items-center`}
      >
        <ListItemSuffix>
          <Chip
            value={cart.length}
            size="sm"
            // variant="text"
            color="red"
            className="rounded-full absolute"
          />
        </ListItemSuffix>
        <FaShoppingCart className="text-xl" />

        <p>Carrito</p>
      </button>

      {/* <span className="absolute top-0 right-1 bg-red-600 text-white font-bold text-xs rounded-full px-[1px]">
        {cart.length}
      </span> */}
    </div>
  );
}
