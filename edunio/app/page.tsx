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
import MonitorCard from "./components/MonitorCard";

export default function Home() {
  const monitors = [
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
      <div className="flex flex-col mt-12 gap-1">
        <h1 className="text-lg font-extrabold text-gray-800">
          Encontre um mentor
        </h1>
        <p className="text-sm text-gray-500">
          Veja os monitores disponíveis na plataforma
        </p>
      </div>
      <div className="bg-gray-100  p-6 mt-12">
        {/* Monitor Cards Section */}
        <section className="my-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {monitors.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </section>
      </div>
    </div>
  );
}
