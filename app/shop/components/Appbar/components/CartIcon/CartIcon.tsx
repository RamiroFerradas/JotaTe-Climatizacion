import { closeMenuCart, openMenuCart } from "@/app/redux/slices/cart";
import { AppStore } from "@/app/redux/store";
import { Dispatch, SetStateAction } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export type CartIconProps = {
  setShowCartMenu: Dispatch<SetStateAction<boolean>>;
  showCartMenu: any;
};

const CartIcon: React.FC<CartIconProps> = ({
  setShowCartMenu,
  showCartMenu,
}) => {
  const { cart, open } = useSelector((state: AppStore) => state.cart);

  const dispatch = useDispatch();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        !open ? dispatch(openMenuCart()) : dispatch(closeMenuCart());
      }}
      className="relative inline-block mt-1 cursor-pointer mr-5"
    >
      <button
        className={`flex-col flex justify-center hover:text-[#006d54] transition-all items-center`}
      >
        <FaShoppingCart />

        <p>Carrito</p>
      </button>

      <span className="absolute top-0 right-1 bg-red-600 text-white font-bold text-xs rounded-full px-1 py-0.3">
        {cart.length}
      </span>
    </div>
  );
};

export default CartIcon;
