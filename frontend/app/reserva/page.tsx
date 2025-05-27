// app/reserva/page.tsx
import { Suspense } from 'react';
import ViewBooking from '@/src/components/ViewBooking';

export default function ReservaPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10 text-gray-600">Cargando reserva...</p>}>
      <ViewBooking />
    </Suspense>
  );
}
