"use client";
import { useDispatch } from "react-redux";
import { Product } from "@/app/models/Product";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { addToCart } from "@/app/redux/slices/cart";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { openProductDetails, selectProduct } from "@/app/redux/slices/product";
import { BaseSyntheticEvent, useState } from "react";
import { toastAddToCart } from "@/app/utilities/toastAddToCart";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleAddToCart = (event: BaseSyntheticEvent) => {
    event.stopPropagation();
    dispatch(addToCart(product));
    toastAddToCart();
  };

  const handleClick = () => {
    dispatch(selectProduct(product));
    dispatch(openProductDetails());
  };

  return (
    <Link
      scroll={false}
      href={`/productos-v2/${product.id}`}
      onClick={handleClick}
    >
      <Card
        className={`border border-gray-400/50 md:h-72 h-60 w-44 md:w-52 flex gap-2 overflow-hidden shadow-md hover:shadow-lg transform ${
          isHovered ? "hover:scale-105 transition-all duration-300" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader
          shadow={false}
          floated={false}
          className="h-32 overflow-hidden flex justify-center items-center cursor-pointer"
          onClick={handleClick}
        >
          <Image
            src={
              isHovered && product.image[1]
                ? product.image[1]
                : product.image[0]
            }
            className="w-full h-40 object-contain transition-transform"
            alt={product.name}
            height={200}
            width={200}
            priority
          />
        </CardHeader>
        <CardBody className="relative p-1 md:p-4 flex items-center justify-between mb-2 flex-col flex-grow">
          <div className="max-h-24 overflow-hidden">
            <Typography color="blue-gray" className="text-center text-sm">
              {product.brand as string}
            </Typography>
            <Typography
              color="blue-gray"
              className="uppercase font-bold text-center text-sm md:text-sm"
            >
              {product.name}
            </Typography>
          </div>
          <Typography
            color="blue-gray"
            className="font-medium font-body text-xs md:text-lg"
          >
            {parseCurrency(Number(product.price))}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
}
