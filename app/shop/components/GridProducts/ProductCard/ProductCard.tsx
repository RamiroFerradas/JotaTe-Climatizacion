export type ProductCardProps = {};

import { Products } from "@/app/models/Products";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import Image from "next/image";

const ProductCard: React.FC<Products> = ({
  image,
  price,
  description,
  name,
}) => {
  return (
    <Card className="border border-gray-400/50 max-w-md">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-32  overflow-hidden flex justify-center items-center"
      >
        <Image
          src={image}
          className="w-full hover:h-60 transition-all h-44 object-contain"
          alt={name}
          height={200}
          width={200}
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium">
            {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100 hover:bg-[#006d54] hover:text-white"
        >
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;