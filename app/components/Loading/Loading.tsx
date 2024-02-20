"use client";
import { CircularProgress } from "@mui/material";
type Props = {};
function Loading({}: Props) {
  return (
    <div className="flex items-center justify-center h-[69vh]">
      <CircularProgress size={45} color="success" />
    </div>
  );
}

export default Loading;
