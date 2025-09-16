export default function CallAction() {
  return (
    <div className=" text-gray-800 p-8  mt-24 mb-8 flex flex-col md:flex-row items-center justify-center gap-4 ">
      {/* Texto */}
      <div className="flex-1 text-center  ">
        <h1 className="text-xl md:text-5xl font-bold mb-3">
          Quer se tornar um{" "}
          <span className="text-amber-500 italic font-light">monitor</span>?
        </h1>
        <p className="text-md md:text-lg mb-5 text-gray-500">
          Crie sua conta, compartilhe seu conhecimento e comece a ensinar hoje
          mesmo!
        </p>
        <button className="bg-amber-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
          Seja um monitor
        </button>
      </div>

      {/* Imagem/ilustração */}
    </div>
  );
}
