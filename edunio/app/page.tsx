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
import { IUser } from "../models/User";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, user, loading } = useAuth();

  const [monitors, setMonitors] = useState<IUser[]>([]);
  const [loadingMonitors, setLoadingMonitors] = useState(true);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await fetch("/api/users?mentors=true");
        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }
        const data = await response.json();
        setMonitors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoadingMonitors(false);
      }
    }
    fetchMentors();
  }, []);

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
            <span className="text-amber-500 ">ajudam você a evoluir</span> no
            seu ritmo.
          </p>
          <div className="mt-4 flex gap-4">
            <button className="bg-amber-500 text-white font-semibold flex gap-2 cursor-pointer px-4 py-3 rounded-lg hover:bg-amber-600 transition-colors">
              <ArrowRight /> Ser um monitor
            </button>
            {!isAuthenticated && (
              <Link
                href="/login"
                className="text-md font-semibold cursor-pointer px-4 py-3 hover:text-amber-500 transition-colors"
              >
                <button>Seja um aluno</button>
              </Link>
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
            Encontre um <span className="text-amber-500 ">mentor</span>
          </h1>
          <p className="text-lg text-gray-500">
            Veja os monitores disponíveis na plataforma
          </p>
        </div>
        <Link
          href="/mentores"
          className="text-gray-900 items-center hover:bg-amber-500 hover:text-white flex gap-2 transition-colors cursor-pointer font-semibold border border-amber-500 px-3 py-2 rounded-md"
        >
          <ArrowRight size={16} className="w-8" />
          ver todos
        </Link>
      </div>

      <div className="bg-gray-100 p-6 mt-12">
        {/* Monitor Cards Section */}
        <section className="my-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loadingMonitors ? (
            <p>Carregando mentores...</p>
          ) : (
            monitors.map((monitor) => (
              <MonitorCard key={monitor._id} monitor={monitor} />
            ))
          )}
        </section>
      </div>

      <CallAction />
      <Beneficio />
      <CallToActionStudent />
      <Depoimentos />

      <div className="mb-2 mt-24">
        <h1 className="text-xl md:text-2xl mb-2 font-extrabold text-gray-800">
          Vem com a <span className="text-amber-500 ">Edunio</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          Aprenda com quem realmente entende do assunto e alcance seus objetivos
          de forma prática e personalizada.
        </p>

        <button className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-md">
          <a href="/cadastro">Criar conta</a>
        </button>
      </div>
    </div>
  );
}
