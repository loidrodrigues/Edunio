import {
  Target,
  Users,
  BookOpen,
  Award,
  Heart,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-800 mb-6">
            Princípios e <span className="text-amber-500 italic">Valores</span>
          </h1>
          <p className="text-lg md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Conheça os fundamentos que guiam a Edunio em sua missão de
            democratizar o conhecimento e conectar mentes brilhantes em todo o
            Brasil.
          </p>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Quem Somos
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A Edunio nasceu da crença de que o conhecimento deve ser acessível
              a todos. Somos uma plataforma brasileira que conecta estudantes
              apaixonados por aprender com mentores especializados, criando uma
              comunidade de aprendizado colaborativo e transformador.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Nossa História
              </h3>
              <p className="text-gray-600 mb-4">
                Fundada em Santa Catarina, Brasil, a Edunio surgiu da
                necessidade de criar pontes entre quem busca conhecimento e quem
                tem expertise para compartilhar. Acreditamos que o aprendizado é
                mais eficaz quando é personalizado e humanizado.
              </p>
              <p className="text-gray-600">
                Desde o início, nosso compromisso é com a excelência educacional
                e a democratização do acesso ao conhecimento de qualidade,
                independentemente de barreiras geográficas ou socioeconômicas.
              </p>
            </div>
            <div className="bg-amber-100 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    1000+
                  </div>
                  <div className="text-gray-600">Estudantes Ativos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    200+
                  </div>
                  <div className="text-gray-600">Mentores Especialistas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    50+
                  </div>
                  <div className="text-gray-600">Áreas de Conhecimento</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    95%
                  </div>
                  <div className="text-gray-600">Taxa de Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Princípios Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Nossos Princípios
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Os valores que nos guiam em cada interação e decisão tomada na
              plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Paixão pelo Aprendizado
              </h3>
              <p className="text-gray-600">
                Acreditamos que o aprendizado é uma jornada contínua e
                prazerosa. Cada interação em nossa plataforma é pensada para
                despertar a curiosidade e o amor pelo conhecimento.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md shadow-md hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Colaboração
              </h3>
              <p className="text-gray-600">
                O conhecimento se multiplica quando compartilhado. Promovemos um
                ambiente onde estudantes e mentores crescem juntos, construindo
                uma comunidade de aprendizado mútuo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md shadow-md hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Excelência
              </h3>
              <p className="text-gray-600">
                Buscamos sempre a mais alta qualidade em nossos serviços. Cada
                mentor é cuidadosamente selecionado e cada experiência de
                aprendizado é pensada para gerar resultados reais.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md shadow-md hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Acessibilidade
              </h3>
              <p className="text-gray-600">
                O conhecimento deve estar ao alcance de todos. Por isso,
                trabalhamos para eliminar barreiras e tornar o aprendizado
                acessível a pessoas de todas as origens e realidades.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md shadow-md hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Integridade
              </h3>
              <p className="text-gray-600">
                Agimos com transparência e ética em todas as nossas relações. A
                confiança é a base de nossa comunidade, e cada interação é
                pautada pelo respeito e pela honestidade.
              </p>
            </div>

            <div className="bg-white p-8 rounded-md shadow-md hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Inovação</h3>
              <p className="text-gray-600">
                Estamos sempre evoluindo e incorporando as melhores práticas
                educacionais. A tecnologia é nossa aliada para criar
                experiências de aprendizado cada vez mais eficazes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visão Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Nossa Visão
            </h2>
            <p className="text-md text-gray-600 mb-8">
              Sonhamos com um Brasil onde o conhecimento é o principal motor de
              transformação social e desenvolvimento pessoal.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Educação para Todos
                </h3>
                <p className="text-gray-600">
                  Tornar o conhecimento de qualidade acessível a todos os
                  brasileiros, independentemente de sua localização ou condição
                  socioeconômica.
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Comunidade Forte
                </h3>
                <p className="text-gray-600">
                  Construir a maior comunidade de aprendizado colaborativo do
                  Brasil, onde cada membro contribui para o crescimento
                  coletivo.
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Impacto Real
                </h3>
                <p className="text-gray-600">
                  Gerar transformação real na vida das pessoas através do
                  conhecimento, contribuindo para o desenvolvimento pessoal e
                  profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14  bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Junte-se à Nossa Missão
          </h2>
          <p className="text-md text-amber-100 mb-8 max-w-3xl mx-auto">
            Seja você um estudante em busca de conhecimento ou um especialista
            querendo compartilhar sua expertise, há um lugar para você na
            Edunio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cadastro"
              className="bg-white text-amber-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/mentores"
              className="border-2 border-white text-white font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-amber-600 transition-colors"
            >
              Conhecer Mentores
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
