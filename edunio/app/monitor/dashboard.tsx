import MonitorCard from "../components/MonitorCard";

const mockSolicitations = [
  {
    id: 1,
    name: "João Silva",
    avatar: "/lo.png",
    rating: 4.8,
    reviews: 12,
    description: "Professor de Matemática com 10 anos de experiência.",
    subjects: ["Matemática", "Física"],
    pricePerHour: 50,
  },
  {
    id: 2,
    name: "Maria Oliveira",
    avatar: "/lo.png",
    rating: 4.5,
    reviews: 8,
    description: "Especialista em Química e Biologia.",
    subjects: ["Química", "Biologia"],
    pricePerHour: 60,
  },
];

export default function MonitorDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Solicitações de Contratação</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockSolicitations.map((monitor) => (
          <MonitorCard key={monitor.id} monitor={monitor} />
        ))}
      </div>
    </div>
  );
}
