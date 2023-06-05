export interface Product {
  name: string;
  image: string | string[];
  price: number;
  description: string;
  id: string;
  brand: string;
  category?: string;
  stock?: number;
  quantity?: number;
}
