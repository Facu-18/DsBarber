'use client';

import { Barber } from '@/src/lib/api/getBarbres';
import { Booking } from '@/src/schemas';
import { formatYYYYMMDDToDDMMYYYY } from '@/src/utils/date';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteBooking } from '@/src/actions/delete-booking-action';

export default function TurnosPorBarbero() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${baseUrl}/barber/barbers`)
      .then((res) => res.json())
      .then(setBarbers)
      .catch((err) => console.error('Error cargando barberos:', err));
  }, []);

  const loadBookings = () => {
    if (!selectedBarberId) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/get-all/${selectedBarberId}`)
      .then((res) => res.json())
      .then(setBookings)
      .catch((err) => console.error('Error cargando turnos:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, [selectedBarberId]);

  const filteredBookings = bookings.filter((b) =>
    dateFilter ? b.date === dateFilter : true
  );

  const handleDelete = async () => {
    if (!bookingToDelete) return;
    setIsDeleting(true);
    const result = await deleteBooking(bookingToDelete);
    if (result.success) {
      toast.success('Reserva eliminada con éxito');
      loadBookings();
    } else {
      toast.error('No se pudo eliminar la reserva');
    }
    setIsDeleting(false);
    setShowModal(false);
    setBookingToDelete(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Turnos por Barbero</h1>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700">Seleccionar barbero</label>
        <select
          value={selectedBarberId ?? ''}
          onChange={(e) => setSelectedBarberId(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full max-w-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="">-- Seleccioná un barbero --</option>
          {barbers.map((b) => (
            <option key={b.barber_id} value={b.barber_id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {selectedBarberId && (
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Filtrar por fecha</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full max-w-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      )}

      {selectedBarberId && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-left font-semibold text-gray-800">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Servicio</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Hora</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center px-6 py-6 text-gray-500">
                    Cargando turnos...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center px-6 py-6 text-gray-500">
                    No hay turnos para esta fecha.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.booking_id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">{b.client.name}</td>
                    <td className="px-6 py-3">{b.client.email}</td>
                    <td className="px-6 py-3">{b.service.name}</td>
                    <td className="px-6 py-3">${b.service.price}</td>
                    <td className="px-6 py-3">{formatYYYYMMDDToDDMMYYYY(b.date)}</td>
                    <td className="px-6 py-3">{b.time.slice(0, 5)}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => {
                          setBookingToDelete(b.booking_id);
                          setShowModal(true);
                        }}
                        disabled={isDeleting}
                        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                          isDeleting
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800'
                        }`}
                      >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity duration-200">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center space-y-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800">Confirmar eliminación</h3>
            <p className="text-sm text-gray-600">¿Estás seguro de que querés eliminar esta reserva?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDeleting
                    ? 'bg-red-300 text-white cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setBookingToDelete(null);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}