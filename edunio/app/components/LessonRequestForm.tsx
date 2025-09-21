"use client";

import { useState } from "react";

interface LessonRequestFormProps {
  mentorId: string;
  studentId?: string;
  onRequestSent: () => void;
}

export default function LessonRequestForm({
  mentorId,
  studentId = "guest",
  onRequestSent,
}: LessonRequestFormProps) {
  const [subject, setSubject] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/lesson-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mentorId,
          studentId,
          subject,
          dateTime,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send lesson request");
      }

      setSuccess(true);
      setSubject("");
      setDateTime("");
      setMessage("");
      onRequestSent();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-md bg-white shadow-md"
    >
      <h3 className="text-lg font-semibold mb-2">Solicitar Aula</h3>
      {error && <p className="text-red-600">{error}</p>}
      {success && (
        <p className="text-green-600">Solicitação enviada com sucesso!</p>
      )}
      <div>
        <label htmlFor="subject" className="block font-medium mb-1">
          Matéria
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Ex: Matemática"
        />
      </div>
      <div>
        <label htmlFor="dateTime" className="block font-medium mb-1">
          Data e Hora
        </label>
        <input
          id="dateTime"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-medium mb-1">
          Mensagem (opcional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
          placeholder="Escreva uma mensagem para o mentor"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar Solicitação"}
      </button>
    </form>
  );
}
