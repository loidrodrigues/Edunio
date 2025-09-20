import { Clock, Users, Award, BookOpen } from "lucide-react";

export default function Beneficio() {
  const benefits = [
    {
      title: "Aprenda no seu ritmo",
      description:
        "Aulas personalizadas que se adaptam ao seu tempo e necessidades.",
      icon: Clock,
    },
    {
      title: "Mentores qualificados",
      description:
        "Profissionais experientes em diversas áreas do conhecimento.",
      icon: Users,
    },
    {
      title: "Qualidade garantida",
      description: "Avaliações e feedback para garantir a melhor experiência.",
      icon: Award,
    },
    {
      title: "Conteúdo abrangente",
      description: "Materiais ricos e variados para um aprendizado completo.",
      icon: BookOpen,
    },
  ];

  return (
    <div className="mt-24">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Por que escolher a <span className="text-amber-500 ">Edunio</span>?
        </h1>
        <p className="text-gray-600">
          Descubra os benefícios de aprender com nossos mentores especializados.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <benefit.icon size={32} className="text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
