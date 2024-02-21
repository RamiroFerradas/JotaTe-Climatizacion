import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
// import { Skeleton } from "@material-ui/lab";
import { Skeleton } from "@mui/material";

export default function CardSkeleton() {
  return (
    <Card className="border border-gray-400/50 md:h-72 h-60 w-44 md:w-52 flex gap-2 overflow-hidden shadow-md">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-32 overflow-hidden flex justify-center items-center cursor-pointer"
      >
        <Skeleton
          height={400}
          variant="rectangular"
          className="w-full h-40 object-contain"
        />
      </CardHeader>
      <CardBody className="relative p-1 md:p-4 flex items-center justify-between mb-2 flex-col flex-grow">
        <div className="flex flex-col items-center justify-center">
          <Skeleton variant="text" width={100} />

          <Skeleton variant="text" width={150} />
        </div>

        <Skeleton variant="text" width={80} />
      </CardBody>
    </Card>
  );
}
