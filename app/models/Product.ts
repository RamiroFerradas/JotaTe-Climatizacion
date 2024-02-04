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
  quantity?: string | number;
  consults?: string | number;
  destacado: boolean;
  newPrice?: string | number;
}
