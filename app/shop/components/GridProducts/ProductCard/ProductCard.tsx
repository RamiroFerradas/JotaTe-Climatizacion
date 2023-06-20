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
    <Card className="border border-gray-400/50 h-96 md:w-60 w-80 flex gap-2">
      <Link scroll={false} href={`/shop/${product.id}`} onClick={handleClick}>
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
          />
        </CardHeader>
        <CardBody className="h-40 overflow-hidden">
          <div className=" flex items-center justify-between mb-2 flex-col">
            <Typography color="blue-gray" className="font-medium">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {parseCurrency(Number(product.price))}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {product.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100 hover:bg-[#006d54] hover:text-white border border-[#006d54]"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(e);
            }}
          >
            Agregar al carrito
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
