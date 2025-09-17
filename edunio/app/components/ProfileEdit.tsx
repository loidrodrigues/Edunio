import { useState } from "react";

interface User {
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
  user: User;
  onSave: (updatedUser: User) => void;
}

export default function ProfileEdit({ user, onSave }: ProfileEditProps) {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nome:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Avatar URL:</label>
        <input
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Matérias:</label>
        <input
          name="subjects"
          value={formData.subjects}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Formação:</label>
        <input
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Experiência:</label>
        <input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Preço por Hora:</label>
        <input
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Disponibilidade:</label>
        {Object.keys(formData.availability).map((day) => (
          <div key={day}>
            <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
            <input
              value={
                formData.availability[day as keyof typeof formData.availability]
              }
              onChange={(e) => handleAvailabilityChange(day, e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Salvar
      </button>
    </form>
  );
}
