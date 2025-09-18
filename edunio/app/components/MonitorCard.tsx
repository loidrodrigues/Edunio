import Image from "next/image";
import Link from "next/link";
import { Star, Book, Clock } from "lucide-react";

export default function MonitorCard({ monitor }: any) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between h-full hover:shadow-xl transition-shadow">
      {/* Topo: avatar + nome + avaliação */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={monitor.avatar}
          alt={monitor.name}
          width={60}
          height={60}
          className="rounded-full border-2 border-gray-900"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-800">{monitor.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            <Star size={16} />
            <span>
              {monitor.rating} ({monitor.reviews})
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col gap-2 flex-1">
        <p className="text-gray-700 text-sm font-semibold line-clamp-2">
          {monitor.description}
        </p>

        <p className="flex items-center gap-2 text-gray-600 text-sm">
          <Book size={16} className="text-amber-500" />
          {monitor.subjects.join(", ")}
        </p>

        <p className="flex items-center gap-2 text-gray-600 text-sm font-semibold">
          <Clock size={16} className="text-yellow-500" />
          R$ {monitor.pricePerHour} / hora
        </p>
      </div>

      {/* Botão */}
      <Link href={`/mentor/${monitor.id}`}>
        <button className="mt-4 w-full  border border-amber-500 text-gray-900 p-2 font-semibold rounded-lg hover:bg-amber-500 hover:text-white cursor-pointer transition-colors">
          Ver Detalhes
        </button>
      </Link>
    </div>
  );
}
