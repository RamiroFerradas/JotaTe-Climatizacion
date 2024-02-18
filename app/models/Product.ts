import { OptionType } from "./OptionType";

export interface Product {
  name: string;
  image: string[];
  price: string | number;
  description: string;
  id: string;
  brand: OptionType | string;
  category?: OptionType | string;
  subcategory?: OptionType | string;
  stock?: string | number;
  consults?: string | number;
  destacado: boolean;
  visible: boolean;
  newPrice?: string | number;
}

export interface CartProduct extends Product {
  quantity: number;
}
