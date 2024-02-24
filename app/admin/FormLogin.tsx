"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jotaTeLogoResponsive from "@/public/logotipo-20221208T001432Z-001/logotipo/sin fondo/jotaté logotipo1.png";
import { Image } from "@unpic/react/nextjs";
import { CircularProgress } from "@mui/material";

export default function FormLogin({ session }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Nuevo estado para el loader
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
      setLoading(true); // Inicia el loader

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
    } finally {
      setLoading(false); // Detiene el loader después de completar la autenticación (éxito o error)
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="flex flex-col justify-center items-center gap-6 h-screen"
    >
      <div className="flex flex-col justify-center items-center gap-6 h-screen6 border-4 border-orange-principal/70 rounded-xl w-80 p-10">
        <Image
          src={jotaTeLogoResponsive}
          height={100}
          width={100}
          alt="logo-jotate"
        />
        <input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border-green-principal border-2 rounded-md w-52 p-2 focus:border-green-principal"
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border-green-principal border-2 rounded-md w-52 p-2 focus:border-green-principal"
          placeholder="Contraseña"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="bg-orange-principal text-white w-52 h-10 font-semibold border-2 rounded-md p-1 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={18} color="success" />
          ) : (
            "Ingresar"
          )}
        </button>
      </div>
    </form>
  );
}
