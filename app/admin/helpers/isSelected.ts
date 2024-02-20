import { Product } from "@/app/models";

export const isSelected = (selected: Product[], productId: string) =>
  Array.isArray(selected) &&
  selected.some((product) => product.id === productId);
