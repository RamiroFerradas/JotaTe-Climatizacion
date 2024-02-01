export interface Product {
  name: string;
  image: string[];
  price: string | number;
  description: string;
  id: string;
  brand: string;
  category?: string;
  subcategory?: string;
  stock?: string | number;
  quantity?: string | number;
  consults?: string | number;
  destacado: boolean;
  newPrice?: string | number;
}
