"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success) {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center py-30 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-1/3"
      >
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 text-center">
            Edu<span className="text-amber-500 italic font-light">nio</span>
          </h1>
        </div>
        <h2 className="text-xl mb-6 font-bold text-gray-800">
          Entrar na sua{" "}
          <span className="text-amber-500 italic font-light">conta</span>.
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="">
            E-mail
          </label>
          <input
            type="email"
            placeholder="Insira o seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-2 flex flex-col gap-2">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Insira a sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <a href="#" className="text-sm text-amber-500 ">
            Esqueceu a senha?{" "}
            <span className="hover:underline text-blue-900">
              Recuperar a senha
            </span>
          </a>
        </div>
        <div className="mb-2"></div>
        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 transition-colors"
        >
          Entrar
        </button>
        <div>
          <p className="mt-4 text-center text-gray-600">
            Não possui uma conta?{" "}
            <a href="/cadastro" className="text-amber-500 hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
