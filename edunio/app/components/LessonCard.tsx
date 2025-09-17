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
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <p>
        <strong>Matéria:</strong> {lesson.subject}
      </p>
      <p>
        <strong>Data/Hora:</strong> {new Date(lesson.dateTime).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {lesson.status}
      </p>
      {lesson.mentorName && (
        <p>
          <strong>Monitor:</strong> {lesson.mentorName}
        </p>
      )}
      {lesson.studentName && (
        <p>
          <strong>Aluno:</strong> {lesson.studentName}
        </p>
      )}
    </div>
  );
}
