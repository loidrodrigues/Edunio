import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Edunio</h3>
            <p className="text-gray-300 text-sm mb-4">
              Plataforma de educação online dedicada a conectar estudantes e
              mentores para um aprendizado colaborativo e eficaz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/sobre"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="/contactos"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contactos
                </a>
              </li>
              <li>
                <a
                  href="/termos"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@edunio.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+351 123 456 789</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Santa Catarina, Brasil</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Edunio. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
