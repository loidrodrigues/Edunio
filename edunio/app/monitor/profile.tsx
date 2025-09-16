"use client";
import { useState } from "react";

const mockSolicitations = [
  {
    id: 1,
    userName: "Carlos Souza",
    userEmail: "carlos@example.com",
    message: "Gostaria de contratar para aulas de Matemática.",
    date: "2024-06-01",
  },
  {
    id: 2,
    userName: "Ana Pereira",
    userEmail: "ana@example.com",
    message: "Interessada em aulas de Física, por favor entre em contato.",
    date: "2024-06-03",
  },
];

export default function MonitorProfile() {
  const [solicitations, setSolicitations] = useState(mockSolicitations);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Perfil do Monitor</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Solicitações de Contratação
        </h2>
        {solicitations.length === 0 ? (
          <p>Nenhuma solicitação no momento.</p>
        ) : (
          <ul className="space-y-4">
            {solicitations.map((solicitation) => (
              <li
                key={solicitation.id}
                className="border p-4 rounded shadow-sm"
              >
                <p>
                  <strong>Nome:</strong> {solicitation.userName}
                </p>
                <p>
                  <strong>Email:</strong> {solicitation.userEmail}
                </p>
                <p>
                  <strong>Mensagem:</strong> {solicitation.message}
                </p>
                <p>
                  <strong>Data:</strong> {solicitation.date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
