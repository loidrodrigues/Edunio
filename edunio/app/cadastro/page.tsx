"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  isMentor: boolean;
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

export default function Register() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    isMentor: false,
    avatar: "",
    subjects: "",
    description: "",
    education: "",
    experience: "",
    pricePerHour: "",
    availability: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (name.startsWith("availability.")) {
      const day = name.split(".")[1];
      setForm({
        ...form,
        availability: { ...form.availability, [day]: value },
      });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        router.push("/login");
        setForm({
          name: "",
          email: "",
          password: "",
          isMentor: false,
          avatar: "",
          subjects: "",
          description: "",
          education: "",
          experience: "",
          pricePerHour: "",
          availability: {
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
            sunday: "",
          },
        });
      } else {
        setError(data.message || "Erro no cadastro");
      }
    } catch (error: any) {
      setError(error.message || "Erro no cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-1/3"
      >
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 text-center">
            Edu<span className="text-amber-500 italic font-light">nio</span>
          </h1>
        </div>
        <h2 className="text-2xl mb-6 font-bold text-gray-800">
          Crie sua{" "}
          <span className="text-amber-500 italic font-light">conta</span>.
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Nome */}
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            name="name"
            placeholder="Insira seu nome"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Insira seu email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={loading}
          />
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-2 mb-3">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={loading}
          />
        </div>

        {/* Checkbox Mentor */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="isMentor"
            checked={form.isMentor}
            onChange={handleChange}
            className="w-4 h-4"
            disabled={loading}
          />
          <label htmlFor="isMentor">Quero me cadastrar como Mentor</label>
        </div>

        {/* Campos extras se for mentor */}
        {form.isMentor && (
          <div className="border-t border-gray-300 pt-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Informações do Mentor
            </h3>

            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="avatar">Avatar (URL)</label>
              <input
                type="text"
                name="avatar"
                placeholder="URL da imagem do avatar"
                value={form.avatar}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="subjects">Matérias</label>
              <input
                type="text"
                name="subjects"
                placeholder="Ex: Matemática, Física"
                value={form.subjects}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="description">Descrição</label>
              <textarea
                name="description"
                placeholder="Fale sobre sua experiência, forma de ensino..."
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="education">Educação</label>
              <input
                type="text"
                name="education"
                placeholder="Ex: Graduação em Matemática"
                value={form.education}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="experience">Experiência</label>
              <input
                type="text"
                name="experience"
                placeholder="Ex: 5 anos de ensino"
                value={form.experience}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="pricePerHour">Preço por hora (R$)</label>
              <input
                type="number"
                name="pricePerHour"
                placeholder="Ex: 50"
                value={form.pricePerHour}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label>Disponibilidade</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="availability.monday"
                  placeholder="Segunda"
                  value={form.availability.monday}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="availability.tuesday"
                  placeholder="Terça"
                  value={form.availability.tuesday}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="availability.wednesday"
                  placeholder="Quarta"
                  value={form.availability.wednesday}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="availability.thursday"
                  placeholder="Quinta"
                  value={form.availability.thursday}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="availability.friday"
                  placeholder="Sexta"
                  value={form.availability.friday}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="availability.saturday"
                  placeholder="Sábado"
                  value={form.availability.saturday}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={loading}
                />
                <input
                  type="text"
                  name="availability.sunday"
                  placeholder="Domingo"
                  value={form.availability.sunday}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        )}

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 transition-colors"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {/* Link login */}
        <div>
          <p className="mt-4 text-center text-gray-600">
            Já possui uma conta?{" "}
            <a href="/login" className="text-amber-500 hover:underline">
              Entre aqui
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
