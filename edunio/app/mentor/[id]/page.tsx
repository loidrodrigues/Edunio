"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
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

const monitors = [
  // ... seus mentores (mesmo array que você já tinha)
  {
    id: 1,
    name: "Ana Souza",
    avatar:
      "https://93cf30e14ffe27bbc170-56f4a41899529a041b24911e6894a309.ssl.cf1.rackcdn.com/store54/produtos/4759/retrato-profissional-20210412-171840-442.jpg", // imagem do mentor
    subjects: ["Matemática", "Álgebra", "Cálculo"], // matérias que domina
    description:
      "Professora de Matemática com 5 anos de experiência em ensino superior e monitorias online.",
    rating: 4.8, // nota média
    reviews: 12, // número de avaliações
    pricePerHour: 50, // preço por hora em reais
    availability: {
      monday: ["10:00", "14:00"],
      wednesday: ["09:00", "18:00"],
      friday: ["08:00", "12:00"],
    },
    education: "Licenciatura em Matemática - Universidade XYZ",
    experience: "5 anos como professora universitária e monitorias online",
    contactEmail: "ana@edunio.com.br",
  },
  {
    id: 2,
    name: "Bruno Lima",
    avatar:
      "https://93cf30e14ffe27bbc170-56f4a41899529a041b24911e6894a309.ssl.cf1.rackcdn.com/store54/produtos/4759/retrato-perfil-profissional-pacote-10-fotos-20241009-172129-294.jpg",
    subjects: ["Programação", "Desenvolvimento Web", "JavaScript"],
    description:
      "Desenvolvedor Full-Stack com experiência em mentorias para estudantes de TI.",
    rating: 4.9,
    reviews: 20,
    pricePerHour: 70,
    availability: {
      tuesday: ["14:00", "18:00"],
      thursday: ["10:00", "16:00"],
    },
    education: "Bacharel em Ciência da Computação - Universidade ABC",
    experience: "3 anos como desenvolvedor e mentor de programação",
    contactEmail: "bruno@edunio.com.br",
  },
  {
    id: 3,
    name: "Carla Mendes",
    avatar:
      "https://evorastudio.com.br/wp-content/uploads/2021/04/retrato-corporativo-foto-perfil-profissional-foto-linkedin-24-scaled.jpg",
    subjects: ["Física", "Química"],
    description:
      "Engenheira Química com experiência em monitorias para ensino médio e superior.",
    rating: 4.7,
    reviews: 15,
    pricePerHour: 60,
    availability: {
      monday: ["09:00", "12:00"],
      wednesday: ["13:00", "17:00"],
      friday: ["10:00", "14:00"],
    },
    education: "Engenharia Química - Universidade DEF",
    experience: "4 anos como professora e mentora",
    contactEmail: "carla@edunio.com.br",
  },
  {
    id: 4,
    name: "Diego Santos",
    avatar:
      "https://storage.alboom.ninja/sites/1348/albuns/956272/retrato_corporativo___retrato_profissional___diego_rocha_fotografo___foto_de_perfil_profissional___retrato_para_linkedin__030.jpg?t=1643996070",
    subjects: ["História", "Geografia"],
    description:
      "Historiador com paixão por ensinar e ajudar estudantes a entender o passado.",
    rating: 4.6,
    reviews: 10,
    pricePerHour: 45,
    availability: {
      tuesday: ["10:00", "15:00"],
      thursday: ["09:00", "13:00"],
    },
    education: "História - Universidade GHI",
    experience: "5 anos como professor e monitor",
    contactEmail: "diego@edunio.com.br",
  },
];

export default function MentorDetail() {
  const params = useParams();
  const mentorId = Number(params.id);
  const mentor = monitors.find((m) => m.id === mentorId);

  const [showContactSuccess, setShowContactSuccess] = useState(false);

  if (!mentor) {
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
                {mentor.subjects.map((subject, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-amber-500 text-sm px-3 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowContactSuccess(true)}
              className="mt-6 w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Contratar Mentor
            </button>

            {showContactSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-amber-600 text-center">
                Contato enviado para {mentor.contactEmail} com sucesso!
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
                  {Object.entries(mentor.availability).map(
                    ([day, hours], idx) => (
                      <span key={idx} className="flex gap-2 items-center">
                        <CheckCircle size={16} className="text-amber-500" />{" "}
                        {day}: {hours.join(" - ")}
                      </span>
                    )
                  )}
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
                <Mail className="text-amber-500" size={16} />{" "}
                {mentor.contactEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
