import AdminComponent from "@/src/components/AdminComponent";
import { Suspense } from "react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[url('/bg-image.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-8 text-center">
          Bienvenido, Admin
        </h1>
        <Suspense>
          <AdminComponent />
        </Suspense>
      </div>
    </div>
  );
}