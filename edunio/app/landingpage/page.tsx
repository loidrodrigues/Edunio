"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Globe,
  Star,
  BookOpen,
  Heart,
  Shield,
  Calendar,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function BecomeMonitor() {
  const { isAuthenticated, user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Crie seu perfil",
      description: "Complete seu perfil com suas habilidades e experiência",
    },
    {
      title: "Defina sua disponibilidade",
      description: "Escolha os horários que você pode dar monitoria",
    },
    {
      title: "Configure seu preço",
      description: "Defina quanto você quer cobrar por hora de monitoria",
    },
    {
      title: "Comece a ensinar",
      description: "Receba alunos e compartilhe seu conhecimento",
    },
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Ganhe dinheiro",
      description:
        "Monetize seu conhecimento e ganhe renda extra ensinando o que você domina",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Horários flexíveis",
      description:
        "Trabalhe nos horários que funcionam melhor para você, de qualquer lugar",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Alcance global",
      description: "Ensine para alunos de todo o país sem sair de casa",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Crescimento profissional",
      description: "Desenvolva habilidades de ensino e fortaleça seu currículo",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Faça a diferença",
      description:
        "Ajoute outros estudantes a alcançarem seus objetivos educacionais",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Plataforma segura",
      description: "Receba pagamentos seguros e tenha suporte da nossa equipe",
    },
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Monitor de Matemática",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Na Edunio, consegui transformar meu conhecimento em matemática em uma fonte de renda consistente. Já ajudei mais de 50 alunos!",
      rating: 5,
    },
    {
      name: "Marina Costa",
      role: "Monitora de Programação",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "A flexibilidade de horários me permite conciliar as monitorias com minha faculdade. É gratificante ver meus alunos evoluindo!",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Monitor de Física",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "A plataforma é intuitiva e o suporte é excelente. Em 3 meses já recuperei meu investimento e agora é lucro!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Monitores ativos" },
    { number: "R$ 45", label: "Preço médio por hora" },
    { number: "95%", label: "De satisfação" },
    { number: "2.000+", label: "Alunos atendidos" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section 
      <section className="mt-32 mb-24 flex">
        <div className="container mx-auto px-4 ">
          <h1 className="text-6xl md:text-6xl font-bold text-gray-800 mb-4">
            Seja Monitor na <span className="">Edunio</span>
          </h1>
          <p className="text-md md:text-lg text-gray-800 mb-6 max-w-3xl">
            Transforme seu conhecimento em uma oportunidade de renda extra
            ajudando outros estudantes a alcançarem seus objetivos
          </p>
          <div className="flex flex-col sm:flex-row gap-2 ">
            {!isAuthenticated ? (
              <>
                <a
                  href="/cadastro?tipo=monitor"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-lg text-md transition-colors flex items-center justify-center gap-2"
                >
                  Começar agora <ArrowRight />
                </a>
                <a
                  href="#como-funciona"
                  className="border-2 border-white hover:bg-white hover:text-amber-500 text-gray-800 font-bold px-8 py-4 rounded-lg text-lg transition-colors"
                >
                  Saiba mais
                </a>
              </>
            ) : (
              <a
                href="/monitor/profile-setup"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-lg text-md transition-colors flex items-center justify-center gap-2"
              >
                Completar perfil de monitor <ArrowRight />
              </a>
            )}
          </div>
        </div>
      </section>
      */}

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl md:text-3xl font-bold text-blue-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Por que ser monitor na Edunio?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubra todos os benefícios de compartilhar seu conhecimento
              conosco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-md shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-amber-500 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-gray-600">
              Em poucos passos você começa a dar monitorias e gerar renda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-lg transition-all ${
                  currentStep === index
                    ? "bg-amber-500 text-white transform scale-105"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              O que nossos monitores dizem
            </h2>
            <p className="text-xl text-gray-600">
              Veja a experiência de quem já está dando monitoria na Edunio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-amber-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-100/50 text-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se à nossa comunidade de monitores e comece a transformar
            vidas através da educação
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <a
                href="/cadastro?tipo=monitor"
                className="bg-amber-500 text-white hover:bg-amber-600 font-bold px-4 py-3 rounded-md text-md transition-colors flex items-center justify-center gap-2"
              >
                Quero ser monitor <ArrowRight />
              </a>
            ) : (
              <a
                href="/monitor/profile-setup"
                className="bg-white text-gray-800 hover:bg-gray-100 font-bold px-4 py-2 rounded-md text-md transition-colors flex items-center justify-center gap-2"
              >
                <p className="text-md">Completar meu perfil</p>{" "}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            <a
              href="/monitores"
              className="border-2 text-gray-800 hover:bg-white hover:text-blue-900  font-bold px-4 py-2 rounded-lg text-md  transition-colors"
            >
              Ver monitores
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Perguntas frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">
                Quanto posso ganhar como monitor?
              </h3>
              <p className="text-gray-600">
                Nossos monitores ganham em média R$ 45 por hora, mas você define
                seu próprio preço com base na sua experiência e qualificação.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">
                Preciso ter diploma para ser monitor?
              </h3>
              <p className="text-gray-600">
                Não é necessário ter diploma. Valorizamos seu conhecimento
                prático e experiência na matéria que deseja ensinar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">
                Como recebo os pagamentos?
              </h3>
              <p className="text-gray-600">
                Os pagamentos são processados semanalmente através de PIX,
                transferência bancária ou cartão de crédito.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
