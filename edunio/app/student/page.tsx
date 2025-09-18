"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../lib/jwt";
import { useAuth } from "../hooks/useAuth";
import LessonCard from "../components/LessonCard";
import ProfileEdit from "../components/ProfileEdit";
import { User, ClipboardList, BookOpen, LogOut, Clock } from "lucide-react";

// --- Dados Mockados ---
const mockSolicitations = [
  {
    id: "1",
    subject: "Matemática",
    dateTime: "2024-06-15T10:00:00Z",
    message: "Preciso de ajuda com álgebra.",
    status: "pending",
  },
  {
    id: "2",
    subject: "Física",
    dateTime: "2024-06-16T14:00:00Z",
    message: "Aula de mecânica.",
    status: "accepted",
  },
];

const mockLessons = [
  {
    id: "1",
    subject: "Matemática",
    dateTime: "2024-06-10T10:00:00Z",
    status: "completed",
    mentorName: "Monitor Exemplo",
  },
  {
    id: "2",
    subject: "Física",
    dateTime: "2024-06-20T14:00:00Z",
    status: "scheduled",
    mentorName: "Outro Monitor",
  },
];

const mockUser = {
  name: "Aluno Exemplo",
  email: "aluno@example.com",
  avatar: "/lo.png",
  subjects: "",
  description: "",
  education: "",
  experience: "",
  pricePerHour: "",
  availability: {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
};

// --- Página Principal ---
export default function StudentDashboard() {
  const router = useRouter();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState("solicitacoes");
  const [solicitations] = useState(mockSolicitations);
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userFromToken = getUserFromToken();
    if (!userFromToken) {
      router.push("/login");
      return;
    }
    if (userFromToken.isMentor) {
      router.push("/login");
      return;
    }
    // Merge token user with defaults
    const updatedUser = {
      name: userFromToken.name || mockUser.name,
      email: userFromToken.email || mockUser.email,
      avatar: mockUser.avatar,
      subjects: mockUser.subjects,
      description: mockUser.description,
      education: mockUser.education,
      experience: mockUser.experience,
      pricePerHour: mockUser.pricePerHour,
      availability: mockUser.availability,
    };
    setUser(updatedUser);
    setLoading(false);
  }, [router]);

  const handleSaveProfile = (updatedUser: typeof user) => setUser(updatedUser);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-10 mt-10">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <p className="font-bold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">Aluno</p>
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
              <ClipboardList className="w-5 h-5 mr-2" /> Minhas Solicitações
            </button>
            <button
              onClick={() => setActiveTab("historico")}
              className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                activeTab === "historico"
                  ? "bg-amber-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-5 h-5 mr-2" /> Aulas
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "perfil" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Editar Perfil</h2>
            <ProfileEdit user={user} onSave={handleSaveProfile} />

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
              Minhas Solicitações
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {solicitations.map((s) => (
                <div
                  key={s.id}
                  className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm"
                >
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-amber-500" />{" "}
                    {s.subject}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Data/Hora: {new Date(s.dateTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Mensagem: {s.message}</p>
                  <p
                    className={`mt-2 font-medium ${
                      s.status === "pending"
                        ? "text-yellow-600"
                        : s.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {s.status}
                  </p>
                </div>
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
