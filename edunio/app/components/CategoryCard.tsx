import { LucideIcon } from "lucide-react";

export default function CategoryCard({
  category,
}: {
  category: { title: string; description: string; icon: LucideIcon };
}) {
  const IconComponent = category.icon;
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-md shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="flex flex-col items-center gap-3">
        <IconComponent size={24} className="text-amber-500" />
        <h2 className="text-sm font-semibold text-gray-800">
          {category.title}
        </h2>
      </div>
    </div>
  );
}
