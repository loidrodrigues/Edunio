"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../../lib/jwt";
import { useAuth } from "../../hooks/useAuth";
import SolicitationCard from "../../components/SolicitationCard";
import LessonCard from "../../components/LessonCard";
import ProfileEdit from "../../components/ProfileEdit";
import { User, ClipboardList, BookOpen, LogOut } from "lucide-react";

interface Solicitation {
  id: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  dateTime: string;
  message: string;
  status: string;
}

interface Lesson {
  id: string;
  subject: string;
  dateTime: string;
  status: string;
  meetingLink: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  subjects: string;
  description: string;
  education: string;
  experience: string;
  pricePerHour: string;
  availability: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export default function MonitorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("solicitacoes");
  const [solicitations, setSolicitations] = useState<Solicitation[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenUser = getUserFromToken();
        console.log("Token user:", tokenUser);
        if (!tokenUser) {
          console.log("No token user found, redirecting to login");
          router.push("/login");
          return;
        }
        if (!tokenUser.isMentor) {
          console.log("User is not a mentor, redirecting to login");
          router.push("/login");
          return;
        }

        const userId = tokenUser.userId;
        console.log("User ID from token:", userId);
        if (!userId) {
          console.error("User ID is undefined in token");
          setError("User ID not found in token");
          setLoading(false);
          return;
        }

        // Fetch user profile
        const userResponse = await fetch(`/api/users/${userId}`);
        console.log("User API response status:", userResponse.status);
        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.error("User API error:", errorText);
          throw new Error("Failed to fetch user profile");
        }
        const userData = await userResponse.json();
        console.log("User data:", userData);
        setUser(userData);

        // Fetch lesson requests
        const requestsResponse = await fetch(
          `/api/lesson-requests?mentorId=${userId}`
        );
        if (!requestsResponse.ok)
          throw new Error("Failed to fetch lesson requests");
        const requestsData = await requestsResponse.json();
        const mappedSolicitations = requestsData.map((req: any) => ({
          id: req._id,
          studentName: req.student.name,
          studentEmail: req.student.email,
          subject: req.subject,
          dateTime: req.dateTime,
          message: req.message,
          status: req.status,
        }));
        setSolicitations(mappedSolicitations);

        // Fetch lessons
        const lessonsResponse = await fetch(
          `/api/lessons?userId=${userId}&role=mentor`
        );
        if (!lessonsResponse.ok) throw new Error("Failed to fetch lessons");
        const lessonsData = await lessonsResponse.json();
        setLessons(lessonsData);

        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleAccept = async (id: string) => {
    // Call API to update status to accepted
    try {
      const response = await fetch(`/api/lesson-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });
      if (response.ok) {
        const updated = await response.json();
        setSolicitations(
          solicitations.map((s) =>
            s.id === id ? { ...s, status: updated.status } : s
          )
        );
      }
    } catch (error) {
      console.error("Failed to accept solicitation", error);
    }
  };

  const handleReject = async (id: string) => {
    // Call API to update status to rejected
    try {
      const response = await fetch(`/api/lesson-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (response.ok) {
        const updated = await response.json();
        setSolicitations(
          solicitations.map((s) =>
            s.id === id ? { ...s, status: updated.status } : s
          )
        );
      }
    } catch (error) {
      console.error("Failed to reject solicitation", error);
    }
  };

  const handleSaveProfile = async (updatedUser: UserProfile) => {
    try {
      const tokenUser = getUserFromToken();
      if (!tokenUser) return;

      const userId = tokenUser.userId;
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUser(updatedUser);
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const { logout } = useAuth();
  const handleNow = () => {
    if (user) {
      console.log(user);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-10 mt-10">
            <div>
              <p className="font-bold text-gray-800">{user?.name}</p>
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
        {activeTab === "perfil" && user && (
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
                {lessons
                  .filter((l) => l.status === "completed")
                  .map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Agendadas</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {lessons
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
