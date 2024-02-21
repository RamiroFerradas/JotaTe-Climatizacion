import { CircularProgress } from "@mui/material";

type Props = {};
export default function LoadingProducts({}: Props) {
  return (
    <div className=" h-screen w-screen">
      <CircularProgress size={45} color="success" />
    </div>
  );
}
