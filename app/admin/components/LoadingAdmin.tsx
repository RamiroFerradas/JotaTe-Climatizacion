import { CircularProgress } from "@mui/material";

type Props = {};
export default function LoadingAdmin({}: Props) {
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <CircularProgress size={45} color="success" />
    </div>
  );
}
