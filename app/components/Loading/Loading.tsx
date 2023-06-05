"use client";
import { Spinner } from "@material-tailwind/react";
type Props = {};
function Loading({}: Props) {
  return (
    <div className="flex items-center justify-center h-[69vh]">
      <Spinner className="h-12 w-12" color="teal" />
    </div>
  );
}

export default Loading;
