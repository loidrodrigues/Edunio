import { useState } from "react";

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
    <div className="border p-4 rounded shadow-sm bg-white">
      <p>
        <strong>Aluno:</strong> {solicitation.studentName}
      </p>
      <p>
        <strong>Email:</strong> {solicitation.studentEmail}
      </p>
      <p>
        <strong>Matéria:</strong> {solicitation.subject}
      </p>
      <p>
        <strong>Data/Hora:</strong>{" "}
        {new Date(solicitation.dateTime).toLocaleString()}
      </p>
      <p>
        <strong>Mensagem:</strong> {solicitation.message}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleAccept}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Aceitar
        </button>
        <button
          onClick={handleReject}
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
