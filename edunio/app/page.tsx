import Image from "next/image";
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
} from "lucide-react";
import Search from "./components/Search";

export default function Home() {
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
  return (
    <div className="flex flex-col  justify-between p-24  ">
      <div className="flex flex-col  gap-2">
        <h1 className="text-4xl w-3/5 font-extrabold text-gray-800">
          Aprenda com quem entende do assunto que você deseja dominar
        </h1>
        <p>
          Na Edunio, você encontra mentores que ajudam você a evoluir no seu
          ritmo.
        </p>
      </div>
      {
        /* Categories Section */
        <div className="gap-4 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {category.map((cat, index) => (
            <CategoryCard key={index} category={cat} />
          ))}
        </div>
      }
      <Search />
    </div>
  );
}
