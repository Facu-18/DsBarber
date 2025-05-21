// app/admin/page.tsx

import AdminComponent from "@/src/components/AdminComponent";


export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bienvenido, Admin</h1>
      <AdminComponent />
    </div>
  );
}