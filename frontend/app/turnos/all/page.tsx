'use client';

import { Barber } from '@/src/lib/api/getBarbres';
import { Booking } from '@/src/schemas';
import { useEffect, useState } from 'react';

export default function TurnosPorBarbero() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar barberos
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/barber/barbers`)
      .then((res) => res.json())
      .then(setBarbers)
      .catch((err) => console.error('Error cargando barberos:', err));
  }, []);

  // Cargar turnos cuando se selecciona un barbero
  useEffect(() => {
    if (!selectedBarberId) return;

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/get-all/${selectedBarberId}`)
      .then((res) => res.json())
      .then(setBookings)
      .catch((err) => console.error('Error cargando turnos:', err))
      .finally(() => setLoading(false));
  }, [selectedBarberId]);

  const filteredBookings = bookings.filter((b) =>
    dateFilter ? b.date === dateFilter : true
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Turnos por Barbero</h1>

      {/* Selector de barbero */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Seleccionar barbero</label>
        <select
          value={selectedBarberId ?? ''}
          onChange={(e) => setSelectedBarberId(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">-- Seleccioná un barbero --</option>
          {barbers.map((b) => (
            <option key={b.barber_id} value={b.barber_id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por fecha */}
      {selectedBarberId && (
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Filtrar por fecha</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      )}

      {/* Tabla */}
      {selectedBarberId && (
        <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left font-semibold text-gray-800">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Servicio</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Hora</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center px-4 py-6">
                    Cargando turnos...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center px-4 py-6">
                    No hay turnos para esta fecha.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.booking_id} className="border-t">
                    <td className="px-4 py-2">{b.client.name}</td>
                    <td className="px-4 py-2">{b.client.email}</td>
                    <td className="px-4 py-2">{b.service.name}</td>
                    <td className="px-4 py-2">${b.service.price}</td>
                    <td className="px-4 py-2">{b.date}</td>
                    <td className="px-4 py-2">{b.time.slice(0, 5)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
