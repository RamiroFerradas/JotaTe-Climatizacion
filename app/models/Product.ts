export interface Product {
  name: string;
  image: string[];
  price: number;
  description: string;
  id: `${string}-${string}-${string}-${string}-${string}`;
  brand: string;
  category?: string;
  stock?: number;
  quantity?: number;
}
