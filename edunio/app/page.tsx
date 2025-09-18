"use client";

import { useState, useEffect } from "react";
import CategoryCard from "./components/CategoryCard";
import {
  Code,
  Palette,
  Megaphone,
  Calculator,
  FunctionSquare,
  Atom,
  Beaker,
  BookOpen,
  Book,
  Globe,
  Music,
  Camera,
  ArrowRight,
} from "lucide-react";
import Search from "./components/Search";
import MonitorCard from "./components/MonitorCard";
import CallAction from "./components/CallAction";
import Beneficio from "./components/Beneficio";
import CallToActionStudent from "./components/CallToActionStudent";
import Depoimentos from "./components/Depoimentos";
import { useAuth } from "./hooks/useAuth";

export default function Home() {
  const { isAuthenticated, user, loading } = useAuth();

  const monitors = [
    {
      id: 1,
      name: "Ana Souza",
      avatar:
        "https://93cf30e14ffe27bbc170-56f4a41899529a041b24911e6894a309.ssl.cf1.rackcdn.com/store54/produtos/4759/retrato-profissional-20210412-171840-442.jpg",
      subjects: ["Matemática", "Álgebra", "Cálculo"],
      description:
        "Professora de Matemática com 5 anos de experiência em ensino superior e monitorias online.",
      rating: 4.8,
      reviews: 12,
      pricePerHour: 50,
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

  const category = [
    {
      title: "Desenvolvimento Web",
      description: "Aprenda a criar sites e aplicações web.",
      icon: Code,
    },
    {
      title: "Design Gráfico",
      description: "Domine as ferramentas de design.",
      icon: Palette,
    },
    {
      title: "Marketing Digital",
      description: "Estratégias para o mundo digital.",
      icon: Megaphone,
    },
    {
      title: "Matemática",
      description: "Estude álgebra, cálculo e muito mais.",
      icon: Calculator,
    },
    {
      title: "Programação",
      description: "Aprenda linguagens e lógica de programação.",
      icon: Code,
    },
    {
      title: "Cálculo II",
      description: "Aprofunde seus conhecimentos em cálculo.",
      icon: FunctionSquare,
    },
    {
      title: "Álgebra",
      description: "Domine os conceitos de álgebra linear e abstrata.",
      icon: Atom,
    },
    {
      title: "Química",
      description: "Explore reações químicas e propriedades dos elementos.",
      icon: Beaker,
    },
    {
      title: "Literatura",
      description: "Analise obras clássicas e contemporâneas.",
      icon: BookOpen,
    },
    {
      title: "História",
      description: "Conheça os eventos que moldaram o mundo.",
      icon: Book,
    },
    {
      title: "Geografia",
      description: "Estude o planeta e suas características.",
      icon: Globe,
    },
    {
      title: "Música",
      description: "Aprenda teoria musical e prática instrumental.",
      icon: Music,
    },
    {
      title: "Fotografia",
      description: "Domine técnicas de captura e edição de imagens.",
      icon: Camera,
    },
  ];

  const titles = [
    "Aprenda com quem entende do assunto que você deseja dominar",
    "Descubra mentores especializados no que você quer aprender",
    "Evolua com especialistas no campo que você deseja se destacar",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState(titles[0]);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentTitleIndex((prev) => {
          const nextIndex = (prev + 1) % titles.length;
          setDisplayedTitle(titles[nextIndex]);
          return nextIndex;
        });
        setOpacity(1);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between px-28 py-24">
      <div>
        <div className="flex flex-col gap-2 mb-8">
          <h1
            className="text-5xl w-3/5 font-extrabold text-gray-800 transition-opacity duration-500"
            style={{ opacity: opacity }}
          >
            {displayedTitle}
          </h1>
          <p className="text-lg text-gray-500 ">
            Na Edunio, você encontra mentores que{" "}
            <span className="text-amber-500 italic font-light">
              ajudam você a evoluir
            </span>{" "}
            no seu ritmo.
          </p>
          <div className="mt-4 flex gap-4">
            <button className="bg-amber-500 text-white font-semibold flex gap-2 cursor-pointer px-4 py-3 rounded-lg hover:bg-amber-600 transition-colors">
              <ArrowRight /> Ser um monitor
            </button>
            {!isAuthenticated && (
              <button className="text-md font-semibold cursor-pointer px-4 py-3 hover:text-amber-500 transition-colors">
                Seja um aluno
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="gap-4 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-amber-100/50 p-12 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {category.map((cat, index) => (
          <CategoryCard key={index} category={cat} />
        ))}
      </div>

      <Search />
      <div className="flex justify-between mt-20 items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Encontre um{" "}
            <span className="text-amber-500 italic font-light">mentor</span>
          </h1>
          <p className="text-lg text-gray-500">
            Veja os monitores disponíveis na plataforma
          </p>
        </div>
        <button className="text-gray-900 items-center hover:bg-amber-500 hover:text-white flex gap-2 transition-colors cursor-pointer font-semibold border border-amber-500 px-3 py-2 rounded-md">
          <ArrowRight size={16} className="w-8" />
          ver todos
        </button>
      </div>

      <div className="bg-gray-100 p-6 mt-12">
        {/* Monitor Cards Section */}
        <section className="my-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {monitors.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </section>
      </div>

      <CallAction />
      <Beneficio />
      <CallToActionStudent />
      <Depoimentos />

      <div className="mb-2 mt-24">
        <h1 className="text-xl md:text-2xl mb-2 font-extrabold text-gray-800">
          Vem com a{" "}
          <span className="text-amber-500 italic font-light">Edunio</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          Aprenda com quem realmente entende do assunto e alcance seus objetivos
          de forma prática e personalizada.
        </p>

        {!isAuthenticated ? (
          <button className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-md">
            <a href="/cadastro">Criar conta</a>
          </button>
        ) : (
          <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-md">
            <a href="/monitor/profile">Acessar meu perfil</a>
          </button>
        )}
      </div>
    </div>
  );
}
