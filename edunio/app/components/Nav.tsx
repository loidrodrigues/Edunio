"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { getUserFromToken } from "../../lib/jwt";
import logo from "../../public/logo1.png";
import { User, LayoutDashboard } from "lucide-react";
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

  const getDashboardPath = () => {
    const user = getUserFromToken();
    if (user && user.isMentor) {
      return "/mentor/dashboard";
    } else {
      return "/student";
    }
  };

  return (
    <nav className="bg-white text-gray-900 shadow-md">
      <div className="flex justify-between items-center p-6 px-16">
        <div>
          <Link href="/">
            <img src={logo.src} alt="Edunio Logo" className="h-10 w-auto" />
          </Link>
        </div>
        <ul className="flex space-x-10">
          <li>
            <Link
              href="/"
              className="hover:underline text-md font-bold hover:text-amber-500 transition-colors duration-300"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              href="/mentores"
              className="hover:underline text-md font-bold hover:text-amber-500 transition-colors duration-300"
            >
              Ver Mentores
            </Link>
          </li>
          <li>
            <Link
              href="/landingpage"
              className="hover:underline text-md font-bold hover:text-amber-500 transition-colors duration-300"
            >
              Seja um monitor
            </Link>
          </li>

          <li>
            <Link
              href="/sobre"
              className="hover:underline text-md font-bold hover:text-amber-500 transition-colors duration-300"
            >
              Princípios e Valores
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link
              href={getDashboardPath()}
              className=" text-gray-900 border border-amber-500 font-semibold px-4 py-2 rounded cursor-pointer hover:text-amber-600 transition-all duration-300 "
            >
              <button>
                <div className="flex items-center cursor-pointer">
                  <LayoutDashboard className="inline-block w-4 h-4 mr-2 cursor-pointer" />
                  <p className="cursor-pointer">Minha Area</p>
                </div>
              </button>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="  px-4 py-2 font-semibold rounded cursor-pointer hover:text-amber-500 transition-all duration-300 "
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="inline-flex items-center gap-2 border border-amber-500 text-amber-500 font-semibold px-4 py-2 rounded cursor-pointer hover:text-blue-900 hover:border-blue-900 transition-all duration-300 "
              >
                <div className="flex items-center cursor-pointer gap-2">
                  <User />
                  Criar conta
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
