"use client";

import { useAuth } from "../hooks/useAuth";

export default function CallToActionStudent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="border text-center  border-gray-200 text-gray-800  p-8 rounded-xl mt-32 mb-24 flex flex-col md:flex-row items-center gap-4">
      {/* Texto */}
      <div className="flex-1">
        <h1 className="text-xl md:text-5xl font-bold mb-3">
          {isAuthenticated ? (
            <>
              Continue <span className="text-amber-500">aprendendo</span>!
            </>
          ) : (
            <>
              Pronto para <span className="text-amber-500">aprender</span>?
            </>
          )}
        </h1>
        <p className="text-md md:text-md mb-4">
          {isAuthenticated
            ? "Acesse sua área pessoal e continue sua jornada de aprendizado!"
            : "Encontre mentores qualificados e acelere seu aprendizado hoje mesmo!"}
        </p>
        <button className="bg-white text-amber-600 font-semibold px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
          {isAuthenticated ? "Acessar Minha Área" : "Encontrar Mentor"}
        </button>
      </div>

      {/* Imagem/ilustração */}
    </div>
  );
}
