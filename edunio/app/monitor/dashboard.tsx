"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../lib/jwt";
import SolicitationCard from "../components/SolicitationCard";
import LessonCard from "../components/LessonCard";
import ProfileEdit from "../components/ProfileEdit";

const mockSolicitations = [
  {
    id: "1",
    studentName: "João Silva",
    studentEmail: "joao@example.com",
    subject: "Matemática",
    dateTime: "2024-06-15T10:00:00Z",
    message: "Preciso de ajuda com álgebra.",
    status: "pending",
  },
  {
    id: "2",
    studentName: "Maria Oliveira",
    studentEmail: "maria@example.com",
    subject: "Física",
    dateTime: "2024-06-16T14:00:00Z",
    message: "Aula de mecânica.",
    status: "pending",
  },
];

const mockLessons = [
  {
    id: "1",
    subject: "Matemática",
    dateTime: "2024-06-10T10:00:00Z",
    status: "completed",
  },
  {
    id: "2",
    subject: "Física",
    dateTime: "2024-06-20T14:00:00Z",
    status: "scheduled",
  },
];

const mockUser = {
  name: "Monitor Exemplo",
  email: "monitor@example.com",
  avatar: "/lo.png",
  subjects: "Matemática, Física",
  description: "Professor experiente.",
  education: "Mestrado em Matemática",
  experience: "10 anos",
  pricePerHour: "50",
  availability: {
    monday: "09:00-17:00",
    tuesday: "09:00-17:00",
    wednesday: "09:00-17:00",
    thursday: "09:00-17:00",
    friday: "09:00-17:00",
    saturday: "",
    sunday: "",
  },
};

export default function MonitorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("perfil");
  const [solicitations, setSolicitations] = useState(mockSolicitations);
  const [user, setUser] = useState(mockUser);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user || !user.isMentor) {
      router.push("/login");
    }
  }, [router]);

  const handleAccept = (id: string) => {
    setSolicitations(
      solicitations.map((s) => (s.id === id ? { ...s, status: "accepted" } : s))
    );
    // TODO: Create lesson from request
  };

  const handleReject = (id: string) => {
    setSolicitations(
      solicitations.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );
  };

  const handleSaveProfile = (updatedUser: typeof user) => {
    setUser(updatedUser);
    // TODO: Save to API
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard do Monitor</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("perfil")}
          className={`px-4 py-2 rounded ${
            activeTab === "perfil" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Perfil e Conta
        </button>
        <button
          onClick={() => setActiveTab("solicitacoes")}
          className={`px-4 py-2 rounded ${
            activeTab === "solicitacoes"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Solicitações de Aula
        </button>
        <button
          onClick={() => setActiveTab("historico")}
          className={`px-4 py-2 rounded ${
            activeTab === "historico" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Histórico de Aulas
        </button>
      </div>

      {activeTab === "perfil" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Editar Perfil</h2>
          <ProfileEdit user={user} onSave={handleSaveProfile} />
          <h2 className="text-2xl font-semibold mb-4 mt-8">Avaliações</h2>
          <p>Avaliações mock: 4.5 estrelas (10 avaliações)</p>
          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Configurações de Conta
          </h2>
          <p>Configurações mock: Notificações por email ativadas.</p>
        </div>
      )}

      {activeTab === "solicitacoes" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Solicitações Recebidas
          </h2>
          <div className="space-y-4">
            {solicitations
              .filter((s) => s.status === "pending")
              .map((solicitation) => (
                <SolicitationCard
                  key={solicitation.id}
                  solicitation={solicitation}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
          </div>
        </div>
      )}

      {activeTab === "historico" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Aulas Realizadas</h2>
          <div className="space-y-4">
            {mockLessons
              .filter((l) => l.status === "completed")
              .map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4 mt-8">Aulas Futuras</h2>
          <div className="space-y-4">
            {mockLessons
              .filter((l) => l.status === "scheduled")
              .map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
