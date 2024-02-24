import { useRouter } from "next/router";

type Props = {};
export default function BackModal({}: Props) {
  const router = useRouter();

  const backModal = () => () => {
    router.push("/productos");
  };
  return backModal();
}
