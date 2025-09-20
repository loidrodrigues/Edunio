export default function CallToActionStudent() {
  return (
    <div className="border text-center  border-gray-200 text-gray-800  p-8 rounded-xl mt-32 mb-24 flex flex-col md:flex-row items-center gap-4">
      {/* Texto */}
      <div className="flex-1">
        <h1 className="text-xl md:text-5xl font-bold mb-3">
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
