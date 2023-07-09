import { useDispatch } from "react-redux";
import { Product } from "@/app/models/Product";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import { addToCart } from "@/app/redux/slices/cart";
import { parseCurrency } from "@/app/utilities/parseCurrency";
import { openProductDetails, selectProduct } from "@/app/redux/slices/product";
import { BaseSyntheticEvent } from "react";
import { toastAddToCart } from "@/app/utilities/toastAddToCart";
import Link from "next/link";
import { Loading } from "@/app/components";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
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
      href={`/productos/${product.id}`}
      onClick={handleClick}
    >
      <Card className="border border-gray-400/50 md:h-72 h-60 w-44 md:w-60 flex gap-2 overflow-hidden">
        <CardHeader
          shadow={false}
          floated={false}
          className="h-32 overflow-hidden flex justify-center items-center cursor-pointer"
          onClick={handleClick}
        >
          <Image
            src={product.image[0]}
            className="w-full hover:scale-125 transition-transform h-40 object-contain"
            alt={product.name}
            height={200}
            width={200}
            priority
          />
        </CardHeader>
        <CardBody className="relative p-1 md:p-4 flex items-center justify-between mb-2 flex-col flex-grow">
          <div>
            <Typography color="blue-gray" className="text-center">
              {product.brand}
            </Typography>
            <Typography
              color="blue-gray"
              className="uppercase font-bold text-center text-xs md:text-base"
            >
              {product.name}
            </Typography>
          </div>
          <Typography
            color="blue-gray"
            className="font-medium font-body text-xs  md:text-lg"
          >
            {parseCurrency(Number(product.price))}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;
