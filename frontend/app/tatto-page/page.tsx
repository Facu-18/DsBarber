import Link from 'next/link';
import Image from 'next/image';

export default function TattooLandingPage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 tracking-tight">
            Mis Tatuajes
          </h1>
          <p className="text-lg sm:text-xl text-blue-800 max-w-2xl mx-auto">
            Descubre el arte del tatuaje junto a Maxi. Cada diseño es una obra única creada con pasión y precisión.
          </p>
        </header>

        {/* Sección del tatuador */}
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 sm:p-8 text-center mb-12 sm:mb-16">
          <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden mb-6">
            <Image
              src="/imageBarber1.jpeg"
              alt="Foto del tatuador"
              width={192}
              height={192}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">Maxi Taborda</h2>
          <p className="text-sm sm:text-base text-blue-800 max-w-2xl mx-auto">
            Con más de 10 años de experiencia, combino creatividad y técnica para transformar tus ideas en arte permanente. Especializado en diversos estilos, su pasión es crear tatuajes que cuenten historias.
          </p>
        </div>

        {/* Sección de trabajos de tatuajes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 sm:mb-16">
          {/* Trabajo 1 */}
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/tatto1.jpeg"
              alt="Tatuaje geométrico"
              width={640}
              height={320}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Realismo religioso</h3>
              <p className="text-sm text-blue-800">
                Retrato detallado de Jesucristo con corona de espinas, estilo sombreado realista en blanco y negro.
              </p>
            </div>
          </div>

          {/* Trabajo 2 */}
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/tatto2.jpeg"
              alt="Tatuaje realista"
              width={640}
              height={320}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Realismo religioso</h3>
              <p className="text-sm text-blue-800">
                Rosa sombreada con cinta que lleva nombres familiares, estilo fino y sentimental.
              </p>
            </div>
          </div>

          {/* Trabajo 3 */}
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/tatto3.jpeg"
              alt="Tatuaje tradicional"
              width={640}
              height={320}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Tatuaje minimalista y simbólico</h3>
              <p className="text-sm text-blue-800">
                Conjunto de íconos pequeños en negro, estilo simple con mensajes personales y estéticos.
              </p>
            </div>
          </div>

          {/* Trabajo 4 */}
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/tatto4.jpeg"
              alt="Tatuaje minimalista"
              width={640}
              height={320}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Blackwork ilustrativo</h3>
              <p className="text-sm text-blue-800">
                Araña negra sólida, estilo gráfico con líneas fuertes y presencia visual.
              </p>
            </div>
          </div>
        </div>

        {/* Llamada a la acción */}
        <div className="text-center mb-12 sm:mb-16">
          <Link
            href="https://www.instagram.com/maxx_taborda_tattoo"
            className="inline-block bg-green-600 text-white py-3 px-8 rounded-xl shadow-md hover:bg-green-500 hover:shadow-lg transition-all duration-200 font-semibold text-sm sm:text-base"
          >
            Explora más tatuajes
          </Link>
        </div>

        {/* Sección de contacto */}
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-6">Contáctanos</h2>
          <p className="text-sm sm:text-base text-blue-800 mb-8 max-w-md mx-auto">
            ¿Listo para tu próximo tatuaje? Contactame en WhatsApp o Instagram para coordinar tu diseño.
          </p>
          <div className="flex justify-center gap-6 sm:gap-8">
            <Link
              href="https://wa.me/543512291106"
              target="_blank"
              className="text-blue-700 hover:text-blue-500 transition-all duration-200"
              aria-label="Contactar por WhatsApp"
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-1.72-6.297z" />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/maxx_taborda_tattoo"
              target="_blank"
              className="text-blue-700 hover:text-blue-500 transition-all duration-200"
              aria-label="Seguir en Instagram"
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}