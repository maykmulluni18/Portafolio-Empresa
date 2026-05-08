import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const navItems = [
  { path: '/admin',             label: 'Dashboard' },
  { path: '/admin/company',     label: 'Empresa' },
  { path: '/admin/services',    label: 'Servicios' },
  { path: '/admin/projects',    label: 'Proyectos' },
  { path: '/admin/clients',     label: 'Clientes' },
  { path: '/admin/requests',    label: 'Solicitudes' },
  { path: '/admin/portfolio',   label: 'Portafolio' },
  { path: '/admin/testimonials',label: 'Testimonios' },
  { path: '/admin/contacts',    label: 'Mensajes' },
  { path: '/admin/users',       label: 'Usuarios' },
  { path: '/admin/roles',       label: 'Roles' },
  { path: '/admin/technologies',label: 'Tecnologías' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1e2730] text-white flex flex-col transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <svg className="w-8 h-8 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-[#ea5959] text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#ea5959] flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-sm text-gray-400 hover:text-white transition-colors text-left"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="text-sm text-gray-500 hover:text-[#ea5959] transition-colors ml-auto">
            Ver sitio publico
          </Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
