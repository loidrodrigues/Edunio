import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-blue-900 text-white">
      <div className="flex justify-between items-center p-8">
        <div>
          <h1 className="text-3xl font-extrabold">
            Edu
            <span className="text-amber-500 font-extrabold italic ">nio</span>
          </h1>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline text-md font-bold">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/monitor" className="hover:underline text-md font-bold">
              Seja um monitor
            </Link>
          </li>
          <li>
            <Link
              href="/contactos"
              className="hover:underline text-md font-bold"
            >
              Contactos
            </Link>
          </li>
          <li>
            <Link href="/sobre" className="hover:underline text-md font-bold">
              Como funciona?
            </Link>
          </li>
        </ul>
        <button>Entrar</button>
      </div>
    </nav>
  );
}
