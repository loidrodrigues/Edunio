export default function CallToActionStudent() {
  return (
    <div className="border border-gray-200 text-gray-800  p-8 rounded-xl mt-24 mb-8 flex flex-col md:flex-row items-center gap-4 shadow-lg">
      {/* Texto */}
      <div className="flex-1">
        <h1 className="text-xl md:text-2xl font-bold mb-1">
          Pronto para{" "}
          <span className="text-amber-600 italic font-light">aprender</span>?
        </h1>
        <p className="text-md md:text-md mb-4">
          Encontre mentores qualificados e acelere seu aprendizado hoje mesmo!
        </p>
        <button className="bg-white text-amber-600 font-semibold px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
          Encontrar Mentor
        </button>
      </div>

      {/* Imagem/ilustração */}
    </div>
  );
}
