import { useState } from "react";
import { User, Mail, BookOpen, Calendar, MessageSquare } from "lucide-react";

interface Solicitation {
  id: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  dateTime: string;
  message: string;
  status: string;
}

interface SolicitationCardProps {
  solicitation: Solicitation;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export default function SolicitationCard({
  solicitation,
  onAccept,
  onReject,
}: SolicitationCardProps) {
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    await onAccept(solicitation.id);
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    await onReject(solicitation.id);
    setLoading(false);
  };

  return (
    <div className="border border-gray-300 bg-white rounded-md shadow-md p-6 transition hover:shadow-lg">
      {/* Nome e Matéria */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          {solicitation.studentName}
        </h3>
        <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
          {solicitation.subject}
        </span>
      </div>

      {/* Informações */}
      <div className="space-y-2 text-gray-700 text-sm">
        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{solicitation.studentEmail}</span>
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{new Date(solicitation.dateTime).toLocaleString()}</span>
        </p>
        <p className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span>{solicitation.message}</span>
        </p>
      </div>

      {/* Ações */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleAccept}
          disabled={loading}
          className="flex-1 bg-green-500 cursor-pointer text-white py-2 rounded-md font-medium hover:bg-green-600 disabled:opacity-50 transition"
        >
          Aceitar
        </button>
        <button
          onClick={handleReject}
          disabled={loading}
          className="flex-1 bg-red-500 cursor-pointer text-white py-2 rounded-md font-medium hover:bg-red-600 disabled:opacity-50 transition"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
