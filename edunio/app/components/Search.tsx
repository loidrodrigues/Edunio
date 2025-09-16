import { Search as SearchIcon } from "lucide-react";
export default function Search() {
  return (
    <div className="flex mt-12 items-centr border border-gray-300 rounded-md px-3 py-2 w-full">
      <input
        type="text"
        placeholder="Procurar cursos, tutores..."
        className="flex-grow outline-none"
      />
      <button className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">
        <SearchIcon size={20} />
      </button>
    </div>
  );
}
