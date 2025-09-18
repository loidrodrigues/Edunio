import { useState } from "react";
import {
  User,
  Mail,
  Image as ImageIcon,
  BookOpen,
  FileText,
  GraduationCap,
  Briefcase,
  DollarSign,
  Calendar,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  subjects: string;
  description: string;
  education: string;
  experience: string;
  pricePerHour: string;
  availability: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

interface ProfileEditProps {
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
}

export default function ProfileEdit({ user, onSave }: ProfileEditProps) {
  if (!user) return <div>Loading...</div>;

  const [formData, setFormData] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvailabilityChange = (day: string, value: string) => {
    setFormData({
      ...formData,
      availability: { ...formData.availability, [day]: value },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md"
    >
      {/* Seção: Dados Pessoais */}
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" /> Dados Pessoais
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Avatar URL
          </label>
          <input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Seção: Profissional */}
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mt-6">
        <Briefcase className="w-5 h-5 text-green-600" /> Perfil Profissional
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Matérias
          </label>
          <input
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Formação
          </label>
          <input
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experiência
          </label>
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Preço por Hora
          </label>
          <input
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Descrição
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Seção: Disponibilidade */}
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mt-6">
        <Calendar className="w-5 h-5 text-purple-600" /> Disponibilidade
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.keys(formData.availability).map((day) => (
          <div key={day}>
            <label className="block text-sm font-medium text-gray-700">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </label>
            <input
              value={
                formData.availability[day as keyof typeof formData.availability]
              }
              onChange={(e) => handleAvailabilityChange(day, e.target.value)}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-purple-400"
              placeholder="Ex: 09:00-17:00"
            />
          </div>
        ))}
      </div>

      {/* Botão */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 cursor-pointer transition"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}
