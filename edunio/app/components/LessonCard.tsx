import {
  BookOpen,
  Calendar,
  User,
  GraduationCap,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface Lesson {
  id: string;
  subject: string;
  dateTime: string;
  status: string;
  mentorName?: string;
  studentName?: string;
}

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const statusConfig: Record<
    string,
    { label: string; color: string; icon: JSX.Element }
  > = {
    completed: {
      label: "Concluída",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    scheduled: {
      label: "Agendada",
      color: "bg-blue-100 text-blue-700",
      icon: <Clock className="w-4 h-4" />,
    },
    canceled: {
      label: "Cancelada",
      color: "bg-red-100 text-red-700",
      icon: <Clock className="w-4 h-4" />,
    },
  };

  const status = statusConfig[lesson.status] || {
    label: lesson.status,
    color: "bg-gray-100 text-gray-700",
    icon: <Clock className="w-4 h-4" />,
  };

  return (
    <div className="border border-gray-300 bg-white rounded-md shadow-md p-6 transition hover:shadow-lg">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          {lesson.subject}
        </h3>
        <span
          className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full font-medium ${status.color}`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      {/* Informações */}
      <div className="space-y-2 text-gray-700 text-sm">
        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{new Date(lesson.dateTime).toLocaleString()}</span>
        </p>

        {lesson.mentorName && (
          <p className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-500" />
            <span>
              <strong>Monitor:</strong> {lesson.mentorName}
            </span>
          </p>
        )}

        {lesson.studentName && (
          <p className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span>
              <strong>Aluno:</strong> {lesson.studentName}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
