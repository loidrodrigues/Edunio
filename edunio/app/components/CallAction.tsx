export default function CallAction() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-amber-500 text-white p-8 rounded-xl mt-24 flex flex-col md:flex-row items-center gap-4 shadow-lg">
      {/* Texto */}
      <div className="flex-1">
        <h1 className="text-xl md:text-2xl font-bold mb-1">
          Quer se tornar um{" "}
          <span className="text-amber-500 italic font-light">monitor</span>?
        </h1>
        <p className="text-md md:text-md mb-4">
          Crie sua conta, compartilhe seu conhecimento e comece a ensinar hoje
          mesmo!
        </p>
        <button className="bg-white text-amber-500 font-semibold px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
          Seja um monitor
        </button>
      </div>

      {/* Imagem/ilustração */}
    </div>
  );
}
