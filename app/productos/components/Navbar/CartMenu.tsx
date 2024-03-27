import { CartProduct } from "@/app/models";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { Typography } from "@material-tailwind/react";
import { Image } from "@unpic/react/nextjs";
import { useState } from "react";
import { BsDash, BsFillCartXFill, BsPlus } from "react-icons/bs";
import { useCart } from "../../context/CartContext";

import ModalCheckout from "./ModalCheckout";
import { usePreferenceMP } from "@/app/hooks";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);

type Props = {};
export default function CartMenu({}: Props) {
  const {
    addToCart,
    clearCart,
    decrementQuantityCart,
    removeFromCart,
    cart,
    openCart,
  } = useCart();
  const { preference } = usePreferenceMP(cart);

  const [openModal, setOpenModal] = useState(false);
  const totalPriceCart = parseCurrency(
    cart.reduce((acc: number, product: CartProduct) => {
      if (product.quantity && product.price) {
        return acc + Number(product.quantity) * Number(product.price);
      }
      return acc;
    }, 0)
  );

  return (
    <>
      {openCart && (
        <div
          className="min-h-[30%] absolute right-0 top-16 w-full md:w-96 bg-white shadow-lg rounded-lg z-50"
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
              cart?.map((product: CartProduct) => (
                <div key={product.id} className="flex items-center p-2">
                  <Image
                    src={product.image[0]}
                    className="w-10 h-10 mr-2"
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                  <div>
                    <p className="text-gray-800">{product.name}</p>
                    <p className="text-gray-600 text-sm">
                      {parseCurrency(Number(product.price))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => decrementQuantityCart(product.id)}
                      className={`text-white px-1 py-1 rounded-md bg-red-500 enabled:hover:bg-red-800 focus:outline-none focus:bg-red-700 
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
                      onClick={() => addToCart(product)}
                      className="text-white px-1 py-1 rounded-md bg-green-principal hover:bg-teal-700 focus:outline-none focus:bg-teal-700"
                    >
                      <BsPlus className="text-gray-200 text-lg" />
                    </button>
                  </div>
                  <div className="flex items-end gap-2 ml-4">
                    <button
                      onClick={() => removeFromCart(product.id)}
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
            <div className="p-2 flex justify-between items-start gap-4 w-full h-20">
              <button
                disabled={!cart.length}
                onClick={() => clearCart()}
                className="bg-red-500 text-white px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 mr-2 disabled:bg-gray-500 w-1/4 mt-[16px] py-3"
              >
                Vaciar
              </button>
              <div className="w-3/4">
                {preference && (
                  <Wallet
                    locale="es-AR"
                    initialization={{
                      preferenceId: preference?.id,
                      redirectMode: "blank",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
