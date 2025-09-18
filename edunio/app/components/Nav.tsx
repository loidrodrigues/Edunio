"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import logo from "../../public/logo1.png";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Nav() {
  const { isAuthenticated, logout } = useAuth();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const handleAuthChange = () => {
      setForceUpdate((prev) => prev + 1);
    };

    window.addEventListener("authStateChanged", handleAuthChange);
    return () =>
      window.removeEventListener("authStateChanged", handleAuthChange);
  }, []);

  return (
    <nav className="bg-white text-gray-900 shadow-md">
      <div className="flex justify-between items-center p-6 px-16">
        <div>
          <Link href="/">
            <img src={logo.src} alt="Edunio Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <ul className="flex space-x-12">
          <li>
            <Link href="/" className="hover:underline text-md font-bold">
              Início
            </Link>
          </li>
          <li>
            <Link href="/monitor" className="hover:underline text-md font-bold">
              Seja um monitor
            </Link>
          </li>
          <li>
            <Link
              href="/contactos"
              className="hover:underline text-md font-bold"
            >
              Contactos
            </Link>
          </li>
          <li>
            <Link href="/sobre" className="hover:underline text-md font-bold">
              Como funciona?
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div>
              <Link
                href="/monitor/profile"
                className=" text-blue-900 px-4 py-2 rounded cursor-pointer hover:text-amber-500 transition-all duration-300 "
              >
                Perfil
              </Link>

              <button
                onClick={logout}
                className=" text-blue-900 px-4 py-2 rounded cursor-pointer hover:text-amber-500 transition-all duration-300 "
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="  px-4 py-2 font-semibold rounded cursor-pointer hover:text-amber-500 transition-all duration-300 "
              >
                Entrar
              </Link>
              <div className="inline-flex items-center gap-2 border border-amber-500 text-amber-500 font-semibold px-4 py-2 rounded cursor-pointer hover:text-blue-900 hover:border-blue-900 transition-all duration-300 ">
                <User />
                <Link href="/cadastro">Criar conta</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
