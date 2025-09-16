export default function CallAction() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-blue-800 text-white p-8 rounded-xl mt-12 flex flex-col md:flex-row items-center gap-4 shadow-lg">
      {/* Texto */}
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-1">
          Quer se tornar um monitor?
        </h1>
        <p className="text-lg md:text-lg mb-4">
          Crie sua conta, compartilhe seu conhecimento e comece a ensinar hoje
          mesmo!
        </p>
        <button className="bg-white text-amber-500 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
          Seja um monitor
        </button>
      </div>

      {/* Imagem/ilustração */}
    </div>
  );
}
