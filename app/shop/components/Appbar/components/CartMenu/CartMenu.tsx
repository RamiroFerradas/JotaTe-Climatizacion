import { Product } from "@/app/models";
import {
  addToCart,
  clearCart,
  decrementQuantityCart,
  removeFromCart,
} from "@/app/redux/slices/cart";

import { AppStore } from "@/app/redux/store";
import { Typography } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";
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
  const totalPriceCart = 99;

  const { cart } = useSelector((state: AppStore) => state.cart);

  // const handlePay = () => {
  //   !isAuthenticated
  //     ? loginWithRedirect()
  //     : Swal.fire({
  //         title: "Realizar el pago",
  //         text: `Desea realizar el pago por $${totalPriceCart}?`,
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "##3B82F6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Pagar",
  //         cancelButtonText: "Cancelar",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           // Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //           let timerInterval: NodeJS.Timeout;
  //           Swal.fire({
  //             title: "Procesando pago",
  //             // html: "I will close in <b></b> milliseconds.",
  //             text: "Aguarde por favor",
  //             timer: 2000,
  //             timerProgressBar: true,
  //             didOpen: () => {
  //               Swal.showLoading();
  //               const b = Swal.getHtmlContainer().querySelector("b");
  //               timerInterval = setInterval(() => {
  //                 if (b) {
  //                   b.textContent = Swal.getTimerLeft().toString();
  //                 }
  //               }, 100);
  //             },
  //             willClose: () => {
  //               clearInterval(timerInterval);
  //             },
  //           }).then((result) => {
  //             /* Read more about handling dismissals below */
  //             if (result.dismiss === Swal.DismissReason.timer) {
  //               handleClearCart();
  //               setShowCartMenu(false);
  //               Swal.fire({
  //                 icon: "success",
  //                 title: "Pago realizado con éxito",
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //               });
  //             }
  //           });
  //         }
  //       });
  // };

  const dispatch = useDispatch();

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product.id));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    showCartMenu && (
      <div className="min-h-[30%] absolute right-0 top-14 w-96 bg-white shadow-lg rounded-lg">
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
                  src={product?.image}
                  className="w-10 h-10 mr-2"
                  alt={product?.name}
                />
                <div>
                  <p className="text-gray-800">{product?.name}</p>
                  <p className="text-gray-600 text-sm">{product?.price}</p>
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
                    onClick={() => handleRemoveFromCart(product)}
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
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700 mr-2 disabled:bg-gray-500"
            >
              Vaciar carrito
            </button>
            <button
              disabled={!cart.length}
              // onClick={() => handlePay()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartMenu;
