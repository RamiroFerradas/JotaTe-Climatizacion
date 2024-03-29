import { CartProduct } from "../models";

export function convertPropertiesToNumbers(product: CartProduct): CartProduct {
  const convertedProduct: CartProduct = { ...product };

  if (typeof convertedProduct.price === "string") {
    convertedProduct.price = Number(convertedProduct.price);
  }

  if (typeof convertedProduct.stock === "string") {
    convertedProduct.stock = Number(convertedProduct.stock);
  }

  if (typeof convertedProduct.quantity === "string") {
    convertedProduct.quantity = Number(convertedProduct.quantity);
  }

  if (typeof convertedProduct.consults === "string") {
    convertedProduct.consults = Number(convertedProduct.consults);
  }

  return convertedProduct;
}
