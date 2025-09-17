import { useState } from "react";

interface RatingFormProps {
  lessonId: string;
  mentorName: string;
  onSubmit: (lessonId: string, rating: number, comment: string) => void;
}

export default function RatingForm({
  lessonId,
  mentorName,
  onSubmit,
}: RatingFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(lessonId, rating, comment);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded shadow-sm bg-white"
    >
      <h3 className="text-lg font-bold mb-2">Avaliar {mentorName}</h3>
      <div className="mb-2">
        <label>Nota (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-1 ml-2"
        />
      </div>
      <div className="mb-2">
        <label>Comentário:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-1 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Enviar Avaliação
      </button>
    </form>
  );
}
