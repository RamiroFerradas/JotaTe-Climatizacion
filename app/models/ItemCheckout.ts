import { Product } from "./Product";

export interface ItemCheckout extends Product {
  currency_id: "ARS";
  quantity: number;
  unit_price: number;
  picture_url: string;
  title: string;
  category_id: string;
  expiration_date_to: string;
}
