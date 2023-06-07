import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
// import { Skeleton } from "@material-ui/lab";

export default function CardSkeleton() {
  return (
    <Card className="border border-gray-400/50 md:w-60 h-96 w-80 flex gap-2 relative z-40">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-40 overflow-hidden flex justify-center items-center"
      >
        <div className="animate-pulse bg-gray-300 w-full hover:h-60 transition-all h-44"></div>
      </CardHeader>
      <CardBody>
        <div className="h-10 flex items-center justify-between mb-2">
          <div className="animate-pulse bg-gray-300 h-4 w-1/3"></div>
          <div className="animate-pulse bg-gray-300 h-4 w-1/4"></div>
        </div>
        <div className="animate-pulse bg-gray-300 h-20 w-5/6"></div>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-center">
          <div className="animate-pulse bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100  hover:text-white rounded-full px-6 py-2">
            <span className="opacity-0">Agregar al carrito</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
