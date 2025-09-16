import Image from "next/image";
import { Star, Quote } from "lucide-react";

export default function Depoimentos() {
  const testimonials = [
    {
      id: 1,
      name: "João Silva",
      avatar:
        "https://storage.alboom.ninja/sites/1348/albuns/956272/retrato_corporativo___retrato_profissional___diego_rocha_fotografo___foto_de_perfil_profissional___retrato_para_linkedin__030.jpg?t=1643996070",
      role: "Estudante de Engenharia",
      quote:
        "A Edunio me ajudou a entender conceitos complexos de matemática de forma clara e prática. Recomendo!",
      rating: 5,
    },
    {
      id: 2,
      name: "Maria Oliveira",
      avatar:
        "https://evorastudio.com.br/wp-content/uploads/2021/04/retrato-corporativo-foto-perfil-profissional-foto-linkedin-24-scaled.jpg",
      role: "Estudante de Programação",
      quote:
        "Os mentores são incríveis! Aprendi JavaScript em poucas semanas graças às aulas personalizadas.",
      rating: 5,
    },
    {
      id: 3,
      name: "Pedro Santos",
      avatar:
        "https://93cf30e14ffe27bbc170-56f4a41899529a041b24911e6894a309.ssl.cf1.rackcdn.com/store54/produtos/4759/retrato-perfil-profissional-pacote-10-fotos-20241009-172129-294.jpg",
      role: "Estudante de Design",
      quote:
        "Encontrei mentores especializados que me guiaram no meu projeto final. Experiência excepcional!",
      rating: 4,
    },
  ];

  return (
    <div className="mt-20 bg-amber-100/50 p-12 ">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-extrabold text-gray-800">
          O que nossos alunos dizem
        </h1>
        <p className="text-gray-600">
          Veja os depoimentos de quem já transformou seu aprendizado conosco.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full border-2 border-gray-300"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <Quote size={24} className="text-gray-400 mb-2" />
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
