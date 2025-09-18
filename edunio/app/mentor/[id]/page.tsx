"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Book,
  Clock,
  Mail,
  CalendarDays,
  Users,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import LessonRequestForm from "../../components/LessonRequestForm";

export default function MentorDetail() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuth();
  const mentorId = params.id as string;

  const [mentor, setMentor] = useState<any>(null);
  const [loadingMentor, setLoadingMentor] = useState(true);
  const [error, setError] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    async function fetchMentor() {
      try {
        const response = await fetch(`/api/users/${mentorId}`);
        if (!response.ok) {
          throw new Error("Mentor not found");
        }
        const data = await response.json();
        setMentor(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoadingMentor(false);
      }
    }
    if (mentorId) {
      fetchMentor();
    }
  }, [mentorId]);

  if (loadingMentor) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="min-h-screen flex justify-center items-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Mentor não encontrado
          </h1>
          <p className="text-gray-600 mt-2">
            Verifique o link ou volte para a lista de mentores.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="text-gray-900 hover:underline mb-4 underline  mt-4 inline-block"
        >
          <h1 className="">Voltar</h1>
        </Link>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Detalhes do{" "}
            <span className="text-amber-500 italic font-light">Mentor</span>
          </h1>
          <p className="text-gray-600">Informações detalhadas sobre o mentor</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: avatar e resumo */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex flex-col items-center">
              <Image
                src={mentor.avatar}
                alt={mentor.name}
                width={200}
                height={200}
                className="rounded-md border-2 border-gray-200 shadow-sm mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {mentor.name}
              </h1>
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star size={16} />
                <span>
                  {mentor.rating} ({mentor.reviews})
                </span>
              </div>
              <p className="text-gray-600 text-center mb-4">
                {mentor.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Book className="text-amber-500" size={16} /> Matérias:
              </div>
              <div className="flex flex-wrap gap-2">
                {mentor.subjects
                  ?.split(",")
                  .map((subject: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-amber-500 text-sm px-3 py-1 rounded-full"
                    >
                      {subject.trim()}
                    </span>
                  ))}
              </div>
            </div>

            {isAuthenticated && user && !mentor.isMentor ? (
              <>
                <button
                  onClick={() => setShowRequestForm(!showRequestForm)}
                  className="mt-6 w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  {showRequestForm ? "Cancelar" : "Solicitar Aula"}
                </button>
                {showRequestForm && (
                  <div className="mt-4">
                    <LessonRequestForm
                      mentorId={mentorId}
                      studentId={user.id}
                      onRequestSent={() => setShowRequestForm(false)}
                    />
                  </div>
                )}
              </>
            ) : (
              <div>
                <p className="mt-6 text-gray-600">
                  Faça login como aluno para solicitar aulas.
                </p>
              </div>
            )}
          </div>

          {/* Right: detalhes e experiência */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-md shadow-sm p-6">
              <h2 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} /> Formação e Experiência
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Formação</h3>
                  <p className="text-gray-700">{mentor.education}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Experiência</h3>
                  <p className="text-gray-700">{mentor.experience}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-sm p-6">
              <h2 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} /> Disponiblidade e Preço
              </h2>
              <h3 className="font-semibold text-gray-800">Horarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 text-gray-600 text-sm mt-1">
                  {Object.entries(
                    mentor.availability as Record<string, string[]>
                  ).map(([day, hours], idx) => (
                    <span key={idx} className="flex gap-2 items-center">
                      <CheckCircle size={16} className="text-amber-500" /> {day}
                      : {hours}
                    </span>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Preço</h3>
                  <div className="flex items-center gap-2 text-gray-700 mt-2">
                    <Clock className="text-amber-500" size={16} /> Preço:{" "}
                    <span className="">R$ {mentor.pricePerHour}/h</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-6">
              <h2 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                Contato
              </h2>
              <p className="text-gray-700 flex items-center gap-2">
                <Mail className="text-amber-500" size={16} /> {mentor.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
