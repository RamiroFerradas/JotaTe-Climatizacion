import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import FormLogin from "./FormLogin";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
export const revalidate = 0;
export default async function Login() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <Toaster position="top-right" />;
      {!session ? <FormLogin session={session} /> : <Dashboard />}
    </>
  );
}
