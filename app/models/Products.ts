import { StaticImageData } from "next/image";

export interface Products {
  name: string;
  image: StaticImageData;
  price: number;
  description: string;
}
