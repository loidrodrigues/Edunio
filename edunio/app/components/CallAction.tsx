"use client";

import { useAuth } from "../hooks/useAuth";

export default function CallAction() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className=" text-gray-800 p-8  mt-24 mb-4 flex flex-col md:flex-row items-center justify-center gap-4 ">
      {/* Texto */}
      <div className="flex-1 text-center  ">
        <h1 className="text-xl md:text-5xl font-bold mb-3   mx-auto">
          {!isAuthenticated ? (
            <>
              Quer se tornar um <span className="text-amber-500 ">monitor</span>
              ?
            </>
          ) : (
            <>
              Bem-vindo de volta,{" "}
              <span className="text-amber-500 ">{user?.name || "Monitor"}</span>
              !
            </>
          )}
        </h1>
        <p className="text-md md:text-lg mb-5 w-2/6 mx-auto text-gray-500">
          {!isAuthenticated
            ? "Crie sua conta, compartilhe seu conhecimento e comece a ensinar hoje mesmo!"
            : "Continue sua jornada e alcance seus objetivos!"}
        </p>
        {!isAuthenticated && (
          <button className="bg-amber-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-amber-600 cursor-pointer transition-colors shadow-md">
            Seja um monitor
          </button>
        )}
      </div>

      {/* Imagem/ilustração */}
    </div>
  );
}
