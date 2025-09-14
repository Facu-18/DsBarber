import Link from 'next/link';
import Image from 'next/image';

export default function TattooLandingPage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Encabezado */}
        <header className="text-center px-6 sm:px-10 pt-10 sm:pt-14">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mis Tatuajes
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Descubre el arte del tatuaje junto a Maxi. Cada diseño es una obra única creada con pasión y precisión.
          </p>
        </header>

        {/* Sección del tatuador */}
        <section className="px-6 sm:px-10 pt-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 shadow-xl p-6 sm:p-8 text-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden ring-2 ring-white/20 mb-6">
              <Image
                src="/imageBarber1.jpeg"
                alt="Foto del tatuador Maxi Taborda"
                width={176}
                height={176}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Maxi Taborda</h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
              Con más de 10 años de experiencia, combino creatividad y técnica para transformar tus ideas en arte permanente.
              Especializado en diversos estilos, mi pasión es crear tatuajes que cuenten historias.
            </p>

            <div className="mt-5 flex justify-center gap-3">
              <Link
                href="https://wa.me/543512122064"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold hover:shadow-xl active:scale-[0.99] transition"
                aria-label="Contactar por WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-1.72-6.297z" />
                </svg>
                WhatsApp
              </Link>
              <Link
                href="https://www.instagram.com/maxx_taborda_tattoo"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white/90 hover:bg-white/15 transition"
                aria-label="Ver en Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm10 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
                Instagram
              </Link>
            </div>
          </div>
        </section>

        {/* Sección de trabajos */}
        <section className="px-6 sm:px-10 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                src: '/tatto1.jpeg',
                alt: 'Tatuaje realismo religioso',
                title: 'Realismo religioso',
                desc: 'Retrato detallado de Jesucristo con corona de espinas, sombreado realista en B&N.',
                priority: true,
              },
              {
                src: '/tatto2.jpeg',
                alt: 'Tatuaje realista de rosa',
                title: 'Realismo religioso',
                desc: 'Rosa sombreada con cinta con nombres familiares, estilo fino y sentimental.',
              },
              {
                src: '/tatto3.jpeg',
                alt: 'Tatuaje minimalista y simbólico',
                title: 'Minimalista y simbólico',
                desc: 'Conjunto de íconos pequeños en negro, simple y con mensajes personales.',
              },
              {
                src: '/tatto4.jpeg',
                alt: 'Tatuaje blackwork de araña',
                title: 'Blackwork ilustrativo',
                desc: 'Araña negra sólida, estilo gráfico con líneas fuertes y presencia visual.',
              },
            ].map((t, i) => (
              <article
                key={i}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  <Image
                    src={t.src}
                    alt={t.alt}
                    width={960}
                    height={540}
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    priority={!!t.priority}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-1.5">
                    {t.title}
                  </h3>
                  <p className="text-sm text-white/75">{t.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Llamada a la acción */}
        <div className="px-6 sm:px-10 pt-10 text-center">
          <Link
            href="https://www.instagram.com/maxx_taborda_tattoo"
            target="_blank"
            className="inline-block bg-white text-black py-3 px-6 sm:px-8 rounded-2xl font-semibold shadow-xl hover:shadow-2xl active:scale-[0.99] transition"
          >
            Explora más tatuajes
          </Link>
        </div>

        {/* Sección de contacto */}
        <section className="px-6 sm:px-10 py-10 sm:py-14">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 shadow-xl p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Contactanos</h2>
            <p className="text-sm sm:text-base text-white/80 mb-6 max-w-md mx-auto">
              ¿Listo para tu próximo tatuaje? Escribime por WhatsApp o seguime en Instagram para coordinar tu diseño.
            </p>
            <div className="flex justify-center gap-6 sm:gap-8">
              <Link
                href="https://wa.me/543512122064"
                target="_blank"
                className="text-white/90 hover:text-white transition"
                aria-label="Contactar por WhatsApp"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-1.72-6.297z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/maxx_taborda_tattoo"
                target="_blank"
                className="text-white/90 hover:text-white transition"
                aria-label="Seguir en Instagram"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm10 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
