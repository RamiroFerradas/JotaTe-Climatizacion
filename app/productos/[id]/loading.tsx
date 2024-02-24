import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Drawer,
  Skeleton,
} from "@mui/material";

type Props = {};
export default function LoadingProduct({}: Props) {
  return (
    <div className="overflow-y-auto w-full">
      <div className="flex flex-col min-h-screen justify-between">
        <div>
          <CardMedia className="h-full w-full">
            <Skeleton variant="rectangular" width={"100%"} height={210} />
          </CardMedia>
          <div className="px-3 md:px-8">
            <div className="p-2 transition-all w-full flex justify-center items-start flex-col gap-5">
              <Skeleton width={200} height={25} animation="wave" />
              <Skeleton width={140} height={20} animation="wave" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="70%" />
              <Skeleton width="70%" />
              <Skeleton width="60%" />

              <Divider />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0">
          <CardContent>
            <div className="w-full items-center flex justify-between gap-5">
              <Skeleton
                variant="rectangular"
                width={"45%"}
                height={40}
                animation="wave"
                className="rounded-lg"
              />
              <Skeleton
                variant="rectangular"
                width={"50%"}
                height={40}
                animation="wave"
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
