"use client";
import { useState } from "react";
import Image from "next/image";

const trabajos = [
  {
    id: 1,
    img: "/corte1-dario.jpeg",
    barbero: "Darío",
    avatar: "/imageBarber2.jpeg",
  },
  {
    id: 2,
    img: "/corte2-dario.jpeg",
    barbero: "Darío",
    avatar: "/imageBarber2.jpeg",
  },
  {
    id: 3,
    img: "/corte3-dario.jpeg",
    barbero: "Darío",
    avatar: "/imageBarber2.jpeg",
  },
  {
    id: 4,
    img: "/corte4-dario.jpeg",
    barbero: "Darío",
    avatar: "/imageBarber2.jpeg",
  },
  {
    id: 5,
    img: "/corte1-joaco.jpeg",
    barbero: "Joaquin",
    avatar: "/imageBarber3.jpg",
  },
  {
    id: 6,
    img: "/corte2-joaco.jpeg",
    barbero: "Joaquin",
    avatar: "/imageBarber3.jpg",
  },
  {
    id: 7,
    img: "/corte3-joaco.jpeg",
    barbero: "Joaquin",
    avatar: "/imageBarber3.jpg",
  },
  {
    id: 8,
    img: "/corte4-joaco.jpeg",
    barbero: "Joaquin",
    avatar: "/imageBarber3.jpg",
  },
];

export default function Trabajos() {
  // Estado para likes
  const [likes, setLikes] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikes((prev) =>
      prev.includes(id) ? prev.filter((likeId) => likeId !== id) : [...prev, id]
    );
  };

  return (
    <section className="min-h-screen from-gray-900 via-gray-800 to-black py-12 px-6 rounded-3xl overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
        Nuestros Trabajos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trabajos.map((trabajo) => (
          <div
            key={trabajo.id}
            className="rounded-2xl overflow-hidden bg-gray-800/60 shadow-lg shadow-black/40 hover:scale-105 transition-transform duration-300 relative"
          >
            {/* Corazón */}
            <button
              onClick={() => toggleLike(trabajo.id)}
              className="absolute top-3 right-3 z-10"
            >
              {likes.includes(trabajo.id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  className="w-7 h-7 drop-shadow-md"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                  4.42 3 7.5 3c1.74 0 3.41 0.81 
                  4.5 2.09C13.09 3.81 14.76 3 
                  16.5 3 19.58 3 22 5.42 22 8.5c0 
                  3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={2}
                  className="w-7 h-7 drop-shadow-md"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.76 3.58c-1.15-1.3-3.37-1.3-4.52 0a4.5 4.5 0 00-6.36 6.36l9.08 9.09 
                    9.08-9.09a4.5 4.5 0 00-6.36-6.36z"
                  />
                </svg>
              )}
            </button>

            {/* Foto del corte */}
            <Image
              src={trabajo.img}
              alt={`Corte realizado por ${trabajo.barbero}`}
              width={400}
              height={500}
              className="object-cover w-full h-72"
            />

            {/* Info barbero */}
            <div className="flex items-center gap-3 p-4 bg-gray-900/80">
              <Image
                src={trabajo.avatar}
                alt={trabajo.barbero}
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
              <p className="text-white font-medium">{trabajo.barbero}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
