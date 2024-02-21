import { Product } from "../models";
import { parseCurrency } from "./parseCurrency";

export const consultProductWhatsApp = (selectedProduct: Product) => {
  const phone = process.env.NEXT_PUBLIC_WPP_PHONE;

  const text = "¡Hola! Estoy interesado/a en el siguiente producto:\n\n";
  +`${selectedProduct?.name} - ${parseCurrency(
    Number(selectedProduct?.price)
  )}\n`;
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${phone}?text=${encodedText}`;
  return window.open(url, "_blank");
};
