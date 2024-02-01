"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormLogin({ session }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      if (session) {
        router.push("/admin/dashboard");
      }
    };
    getSession();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.refresh();
    } catch (error) {
      setError(
        "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="flex flex-col justify-center items-center gap-6 h-96"
    >
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border-black border-2 rounded-md w-52 p-1"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="border-black border-2 rounded-md w-52 p-1"
        placeholder="login"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="border-black border-2 rounded-md p-1">
        Ingresar{" "}
      </button>
    </form>
  );
}
