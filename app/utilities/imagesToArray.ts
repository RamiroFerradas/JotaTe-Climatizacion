import { Product } from "../models";

export const imagesToArray = (product: Product) => {
  let imageUrls: string[];
  if (Array.isArray(product.image)) {
    imageUrls = product.image;
  } else {
    imageUrls = (product.image as string).split(",").map((url) => url.trim());
  }
  return {
    ...product,
    image: imageUrls,
  };
};
