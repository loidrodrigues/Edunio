"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";
import logo from "../../public/logo1.png";
interface LoginErrors {
  email: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login } = useAuth();

  const validate = (): boolean => {
    const newErrors: LoginErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) newErrors.email = "Este campo é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "E-mail inválido";
    if (!password) newErrors.password = "Este campo é obrigatório";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        login(data.token);

        // Redireciona e força refresh da página
        window.location.href = "/";

        setEmail("");
        setPassword("");
      } else {
        setError(data.message || "Erro no login");
      }
    } catch (error: any) {
      setError(error.message || "Erro no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-30 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-1/5 "
      >
        <h2 className="text-4xl mb-8 mr-20 font-bold text-gray-800">
          Entra na sua{" "}
          <span className="text-amber-500 italic font-light">conta</span>.
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="">
            E-mail
          </label>
          <input
            type="email"
            placeholder="Insira o seu email"
            value={email}
            onChange={handleChangeEmail}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-2 flex flex-col gap-2">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Insira a sua Senha"
            value={password}
            onChange={handleChangePassword}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
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
          className="w-full border bg-amber-500  border-amber-500 text-white  p-2 rounded hover:bg-amber-600 hover:text-white cursor-pointer transition-colors"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
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
