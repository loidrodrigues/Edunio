"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../lib/jwt";
import { useAuth } from "../hooks/useAuth";
import LessonCard from "../components/LessonCard";
import RatingForm from "../components/RatingForm";
import ProfileEdit from "../components/ProfileEdit";

const mockRequests = [
  {
    id: "1",
    mentorName: "Monitor Exemplo",
    subject: "Matemática",
    dateTime: "2024-06-15T10:00:00Z",
    status: "accepted",
  },
  {
    id: "2",
    mentorName: "Outro Monitor",
    subject: "Física",
    dateTime: "2024-06-16T14:00:00Z",
    status: "pending",
  },
  {
    id: "3",
    mentorName: "Monitor 3",
    subject: "Química",
    dateTime: "2024-06-17T16:00:00Z",
    status: "rejected",
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

export default function StudentPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("perfil");
  const [user, setUser] = useState(mockUser);
  const [ratingLesson, setRatingLesson] = useState<string | null>(null);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user || user.isMentor) {
      router.push("/login");
    }
  }, [router]);

  const handleSaveProfile = (updatedUser: typeof user) => {
    setUser(updatedUser);
    // TODO: Save to API
  };

  const handleRate = (lessonId: string, rating: number, comment: string) => {
    console.log(
      `Avaliação para aula ${lessonId}: ${rating} estrelas, ${comment}`
    );
    setRatingLesson(null);
    // TODO: Submit rating
  };

  const { logout } = useAuth();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex justify-between items-center">
        Área do Aluno
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("perfil")}
          className={`px-4 py-2 rounded ${
            activeTab === "perfil" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Perfil
        </button>
        <button
          onClick={() => setActiveTab("solicitacoes")}
          className={`px-4 py-2 rounded ${
            activeTab === "solicitacoes"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Solicitações
        </button>
        <button
          onClick={() => setActiveTab("aulas")}
          className={`px-4 py-2 rounded ${
            activeTab === "aulas" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Aulas Agendadas
        </button>
      </div>

      {activeTab === "perfil" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Editar Perfil</h2>
          <ProfileEdit user={user} onSave={handleSaveProfile} />
          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Histórico de Aulas
          </h2>
          <div className="space-y-4">
            {mockLessons
              .filter((l) => l.status === "completed")
              .map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
          </div>
        </div>
      )}

      {activeTab === "solicitacoes" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Minhas Solicitações</h2>
          <div className="space-y-4">
            {mockRequests.map((request) => (
              <div
                key={request.id}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <p>
                  <strong>Monitor:</strong> {request.mentorName}
                </p>
                <p>
                  <strong>Matéria:</strong> {request.subject}
                </p>
                <p>
                  <strong>Data/Hora:</strong>{" "}
                  {new Date(request.dateTime).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {request.status}
                </p>
                {request.status === "pending" && (
                  <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Cancelar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "aulas" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Aulas Agendadas</h2>
          <div className="space-y-4">
            {mockLessons
              .filter((l) => l.status === "scheduled")
              .map((lesson) => (
                <div key={lesson.id}>
                  <LessonCard lesson={lesson} />
                  <p className="mt-2">Contato: email@example.com</p>
                </div>
              ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Avaliar Monitores
          </h2>
          <div className="space-y-4">
            {mockLessons
              .filter((l) => l.status === "completed" && !ratingLesson)
              .map((lesson) => (
                <div
                  key={lesson.id}
                  className="border p-4 rounded shadow-sm bg-white"
                >
                  <LessonCard lesson={lesson} />
                  <button
                    onClick={() => setRatingLesson(lesson.id)}
                    className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Avaliar
                  </button>
                </div>
              ))}
            {ratingLesson && (
              <RatingForm
                lessonId={ratingLesson}
                mentorName={
                  mockLessons.find((l) => l.id === ratingLesson)?.mentorName ||
                  ""
                }
                onSubmit={handleRate}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
