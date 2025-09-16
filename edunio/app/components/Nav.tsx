"use client";

import Link from "next/link";
import { isLoggedIn } from "../../lib/jwt";
import { useEffect, useState } from "react";

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("User logged in:", loggedIn);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <nav className="bg-white text-gray-900 shadow-md">
      <div className="flex justify-between items-center p-6 px-12">
        <div>
          <h1 className="text-3xl font-extrabold">
            Edu
            <span className="text-amber-500 font-extrabold italic ">nio</span>
          </h1>
        </div>

        <ul className="flex space-x-4">
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

        <div className="space-x-4">
          {loggedIn ? (
            <Link
              href="/monitor/profile"
              className=" text-blue-900 px-4 py-2 rounded cursor-pointer hover:text-amber-500 transition-all duration-300 "
            >
              Perfil
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className=" text-blue-900 px-4 py-2 rounded cursor-pointer hover:text-amber-500 transition-all duration-300 "
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className=" bg-blue-900 text-white hover:text-amber-500 px-4 py-2 rounded cursor-pointer transition-all duration-300 "
              >
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
