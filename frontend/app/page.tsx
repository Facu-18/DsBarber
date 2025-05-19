import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center py-12 sm:py-16">
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-10 text-center">
        {/* Logo */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-blue-900 rounded-xl flex items-center justify-center mb-6">
          <span className="text-white font-bold text-3xl sm:text-4xl">DS</span>
        </div>

        {/* Título */}
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Ds-barberstudio</h1>
        <p className="text-lg sm:text-xl text-blue-900 mb-8">Somos Ds Barberstudio</p>

        {/* Botones */}
        <div className="space-y-6">
          <Link
            href="/reservar"
            className="w-full bg-blue-800 text-white py-3 rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Agenda tu próxima cita
          </Link>

          <Link
            href="https://wa.me/543512291106"
            target="_blank"
            className="w-full bg-blue-800 text-white py-3 rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-1.72-6.297z" />
            </svg>
            Hablar por WhatsApp
          </Link>

          <Link
            href="https://www.google.com.ar/maps/place/Bartolom%C3%A9+Hidalgo+1660,+X5019+C%C3%B3rdoba/@-31.3593184,-64.1539152,16.75z/data=!4m5!3m4!1s0x943299d5acbeffe7:0xf07ec6359208e65d!8m2!3d-31.3593873!4d-64.1505312?hl=es&entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="w-full bg-blue-800 text-white py-3 rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Nuestra ubicación
          </Link>
        </div>
      </div>
    </div>
  );
}