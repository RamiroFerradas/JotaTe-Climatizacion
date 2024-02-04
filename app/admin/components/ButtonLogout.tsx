"use client";
import { Button } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
type Props = {};
import { AiOutlineLogout } from "react-icons/ai";

function ButtonLogout({}: Props) {
  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  return (
    <Button onClick={handleSignOut}>
      <AiOutlineLogout className={"text-[#006d54] text-2xl"} />
    </Button>
  );
}
export default ButtonLogout;
