"use client";

import { useState, useEffect } from "react";
import MonitorCard from "../components/MonitorCard";
import { IUser } from "../../models/User";
import { Search } from "lucide-react";

export default function MentoresPage() {
  const [mentores, setMentores] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMentores();
  }, []);

  const fetchMentores = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users?mentors=true");
      const data = await response.json();

      if (response.ok) {
        setMentores(data);
      } else {
        setError("Erro ao carregar mentores");
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const filteredMentores = mentores.filter((mentor) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(searchLower) ||
      mentor.subjects.toLowerCase().includes(searchLower) ||
      mentor.description.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando mentores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchMentores}
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nossos <span className="text-amber-500">Mentores</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conheça nossos mentores qualificados e encontre o profissional ideal
            para suas necessidades de aprendizado
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nome, matéria ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredMentores.length} mentor
            {filteredMentores.length !== 1 ? "es" : ""} encontrado
            {filteredMentores.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Mentores Grid */}
        {filteredMentores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMentores.map((mentor) => (
              <MonitorCard key={mentor._id} monitor={mentor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Nenhum mentor encontrado com os critérios de busca.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-amber-500 hover:text-amber-600 font-semibold"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
