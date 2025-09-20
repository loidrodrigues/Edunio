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

interface Errors {
  name: string;
  email: string;
  password: string;
  avatar: string;
  subjects: string;
  description: string;
  education: string;
  experience: string;
  pricePerHour: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
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
  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
    avatar: "",
    subjects: "",
    description: "",
    education: "",
    experience: "",
    pricePerHour: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

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
      setErrors({ ...errors, [day]: "" });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {
      name: "",
      email: "",
      password: "",
      avatar: "",
      subjects: "",
      description: "",
      education: "",
      experience: "",
      pricePerHour: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    };

    if (!form.name.trim()) newErrors.name = "Este campo é obrigatório";
    if (!form.email.trim()) newErrors.email = "Este campo é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "E-mail inválido";
    if (!form.password) newErrors.password = "Este campo é obrigatório";
    else if (form.password.length < 6)
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";

    if (form.isMentor) {
      if (!form.avatar.trim()) newErrors.avatar = "Este campo é obrigatório";
      if (!form.subjects.trim())
        newErrors.subjects = "Este campo é obrigatório";
      if (!form.description.trim())
        newErrors.description = "Este campo é obrigatório";
      if (!form.education.trim())
        newErrors.education = "Este campo é obrigatório";
      if (!form.experience.trim())
        newErrors.experience = "Este campo é obrigatório";
      if (!form.pricePerHour.trim())
        newErrors.pricePerHour = "Este campo é obrigatório";
      else if (
        isNaN(Number(form.pricePerHour)) ||
        Number(form.pricePerHour) <= 0
      )
        newErrors.pricePerHour = "Preço deve ser um número positivo";
      // For availability, maybe check if at least one is filled, but for simplicity, leave optional or require all?
      // To keep simple, make them required if mentor
      if (!form.availability.monday.trim())
        newErrors.monday = "Este campo é obrigatório";
      if (!form.availability.tuesday.trim())
        newErrors.tuesday = "Este campo é obrigatório";
      if (!form.availability.wednesday.trim())
        newErrors.wednesday = "Este campo é obrigatório";
      if (!form.availability.thursday.trim())
        newErrors.thursday = "Este campo é obrigatório";
      if (!form.availability.friday.trim())
        newErrors.friday = "Este campo é obrigatório";
      if (!form.availability.saturday.trim())
        newErrors.saturday = "Este campo é obrigatório";
      if (!form.availability.sunday.trim())
        newErrors.sunday = "Este campo é obrigatório";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

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
        className="bg-white p-6 rounded shadow-md w-1/5"
      >
        <h2 className="text-4xl mb-6 font-bold text-gray-800">
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
            disabled={loading}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
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
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
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
              {errors.avatar && (
                <p className="text-red-500 text-sm">{errors.avatar}</p>
              )}
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
              {errors.subjects && (
                <p className="text-red-500 text-sm">{errors.subjects}</p>
              )}
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
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
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
              {errors.education && (
                <p className="text-red-500 text-sm">{errors.education}</p>
              )}
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
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience}</p>
              )}
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
              {errors.pricePerHour && (
                <p className="text-red-500 text-sm">{errors.pricePerHour}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label>Disponibilidade</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="availability.monday"
                    placeholder="Segunda"
                    value={form.availability.monday}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    disabled={loading}
                  />
                  {errors.monday && (
                    <p className="text-red-500 text-sm">{errors.monday}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="availability.tuesday"
                    placeholder="Terça"
                    value={form.availability.tuesday}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    disabled={loading}
                  />
                  {errors.tuesday && (
                    <p className="text-red-500 text-sm">{errors.tuesday}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="availability.wednesday"
                    placeholder="Quarta"
                    value={form.availability.wednesday}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    disabled={loading}
                  />
                  {errors.wednesday && (
                    <p className="text-red-500 text-sm">{errors.wednesday}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="availability.thursday"
                    placeholder="Quinta"
                    value={form.availability.thursday}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    disabled={loading}
                  />
                  {errors.thursday && (
                    <p className="text-red-500 text-sm">{errors.thursday}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="availability.friday"
                    placeholder="Sexta"
                    value={form.availability.friday}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    disabled={loading}
                  />
                  {errors.friday && (
                    <p className="text-red-500 text-sm">{errors.friday}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="availability.saturday"
                    placeholder="Sábado"
                    value={form.availability.saturday}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    disabled={loading}
                  />
                  {errors.saturday && (
                    <p className="text-red-500 text-sm">{errors.saturday}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="availability.sunday"
                    placeholder="Domingo"
                    value={form.availability.sunday}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    disabled={loading}
                  />
                  {errors.sunday && (
                    <p className="text-red-500 text-sm">{errors.sunday}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition-colors"
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
