import { Product } from "@/app/models";
import {
  addToCart,
  clearCart,
  decrementQuantityCart,
  removeFromCart,
} from "@/app/redux/slices/cart";

import { AppStore } from "@/app/redux/store";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { Typography } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
// import Swal from "sweetalert2";
import { BsDash, BsFillCartXFill, BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

type CartMenuProps = {
  setShowCartMenu: Dispatch<SetStateAction<boolean>>;
  showCartMenu: any;
};

const CartMenu: React.FunctionComponent<CartMenuProps> = ({
  showCartMenu,
  setShowCartMenu,
}) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: AppStore) => state.cart);

  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;

  const totalPriceCart = parseCurrency(
    cart.reduce((acc: number, product: Product) => {
      if (product.quantity && product.price) {
        return acc + product.quantity * product.price;
      }
      return acc;
    }, 0)
  );

  const text = useMemo(() => {
    const introText =
      "¡Hola! Estoy interesado/a en los siguientes productos:\n\n";
    const productText = cart.reduce(
      (message: string, product: Product) =>
        message.concat(
          `- ${product.name} (${product.quantity ?? 0} unidades) - $${
            product.price * (product.quantity ?? 0)
          }\n`
        ),
      ""
    );

    const totalText = `El total es: ${totalPriceCart}`;

    return introText + productText + "\n" + totalText;
  }, [cart]);

  const handleOrderClick = () => {
    if (!cart.length) return;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encodedText}`;

    window.open(url, "_blank");
  };

  return (
    showCartMenu && (
      <div
        className="min-h-[30%] absolute right-0 top-14 w-96 bg-white shadow-lg rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-h-[40vh] max-h-[60vh] overflow-auto">
          {!cart.length ? (
            <div className="flex items-center justify-center h-[40vh]">
              <Typography color="blue-gray" className="font-medium">
                Ups, el carrito está vacío !
              </Typography>
            </div>
          ) : (
            cart?.map((product: Product) => (
              <div key={product.id} className="flex items-center p-2">
                <img
                  src={product.image}
                  className="w-10 h-10 mr-2"
                  alt={product.name}
                />
                <div>
                  <p className="text-gray-800">{product.name}</p>
                  <p className="text-gray-600 text-sm">
                    {parseCurrency(Number(product.price))}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => dispatch(decrementQuantityCart(product.id))}
                    className={`text-white px-1 py-1 rounded-md bg-gray-500 enabled:hover:bg-gray-800 focus:outline-none focus:bg-gray-700 
                  disabled:opacity-50 cursor-not-allowe`}
                    disabled={product.quantity === 1}
                  >
                    <BsDash className="text-gray-200 text-lg" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    disabled
                    value={product.quantity}
                    // onChange={(e) =>
                    //   // handleQuantityChange(product, e.target.value)
                    // }
                    className="text-center text-gray-800 w-12 border-gray-400 border rounded-md flex items-center"
                  />
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="text-white px-1 py-1 rounded-md bg-gray-500 hover:bg-gray-800 focus:outline-none focus:bg-gray-700"
                  >
                    <BsPlus className="text-gray-200 text-lg" />
                  </button>
                </div>
                <div className="flex items-end gap-2 ml-4">
                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className={` text-white px-2 py-2 rounded-md bg-red-500 hover:bg-red-800 focus:outline-none focus:bg-gray-700 `}
                  >
                    <BsFillCartXFill className="text-gray-200 text-lg" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-700/50">
          <div className="flex justify-between p-2">
            <p className="text-gray-800 font-bold">Total:</p>
            <p className="text-gray-800 font-bold">{totalPriceCart}</p>
          </div>
          <div className="p-2 flex justify-center gap-4">
            <button
              disabled={!cart.length}
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 mr-2 disabled:bg-gray-500"
            >
              Vaciar carrito
            </button>
            <button disabled={!cart.length}>
              <a
                href="#"
                onClick={handleOrderClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Completar pedido
              </a>
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartMenu;
