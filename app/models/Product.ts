export interface Product {
  name: string;
  image: string[];
  price: string;
  description: string;
  id: string;
  brand: string;
  category?: string;
  stock?: string;
  quantity?: string | number;
  consults?: string;
}
