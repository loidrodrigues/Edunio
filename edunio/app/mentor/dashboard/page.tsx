"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../../lib/jwt";
import { useAuth } from "../../hooks/useAuth";
import SolicitationCard from "../../components/SolicitationCard";
import LessonCard from "../../components/LessonCard";
import ProfileEdit from "../../components/ProfileEdit";
import { User, ClipboardList, BookOpen, LogOut } from "lucide-react";

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
  name: "Ricardo Manuel",
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
  const [activeTab, setActiveTab] = useState("solicitacoes");
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
  };

  const handleReject = (id: string) => {
    setSolicitations(
      solicitations.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );
  };

  const handleSaveProfile = (updatedUser: typeof user) => {
    setUser(updatedUser);
  };

  const { logout } = useAuth();
  const handleNow = () => {
    console.log(user);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-10 mt-10">
            <div>
              <p className="font-bold text-gray-800">{user.name}</p>
              <button onClick={() => handleNow()}>
                <p className="text-sm text-gray-500">Monitor</p>
              </button>
            </div>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("solicitacoes")}
              className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                activeTab === "solicitacoes"
                  ? "bg-amber-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ClipboardList className="w-5 h-5 mr-2" /> Solicitações
            </button>
            <button
              onClick={() => setActiveTab("historico")}
              className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                activeTab === "historico"
                  ? "bg-amber-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-5 h-5 mr-2" /> Histórico
            </button>
            <button
              onClick={() => setActiveTab("perfil")}
              className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                activeTab === "perfil"
                  ? "bg-amber-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <User className="w-5 h-5 mr-2" /> Perfil e Conta
            </button>
          </nav>
        </div>

        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="w-5 h-5 mr-2" /> Sair
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {activeTab === "perfil" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Editar Perfil</h2>
            <ProfileEdit user={user} onSave={handleSaveProfile} />

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Avaliações</h3>
              <div className="bg-white rounded-lg shadow p-4">
                Avaliações mock: ⭐ 4.5 (10 avaliações)
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Configurações</h3>
              <div className="bg-white rounded-lg shadow p-4">
                Notificações por email: ativadas
              </div>
            </div>
          </div>
        )}

        {activeTab === "solicitacoes" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Solicitações de Aula
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
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
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Aulas</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Concluídas</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {mockLessons
                  .filter((l) => l.status === "completed")
                  .map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Agendadas</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {mockLessons
                .filter((l) => l.status === "scheduled")
                .map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
