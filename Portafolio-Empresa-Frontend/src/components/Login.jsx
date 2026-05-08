import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login({ email, password });
    if (ok) navigate('/admin');
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-white">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
           style={{ background: "linear-gradient(135deg, #ea5959 0%, #e8524b 40%, #f07850 100%)" }}>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 text-white mb-12 hover:opacity-80 transition-opacity w-max">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 15l2-2 2 2" />
            </svg>
            <span className="font-bold text-xl tracking-wide">Nombre Empresa</span>
          </Link>
          <div className="max-w-md mt-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Bienvenido de <br />vuelta al panel.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Accede a tu cuenta para gestionar proyectos, revisar reportes y comunicarte con el equipo.
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-auto">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 w-max">
            <div className="flex -space-x-3">
              {[1,2,3].map((n) => <img key={n} className="w-10 h-10 rounded-full border-2 border-[#ea5959]" src={`https://i.pravatar.cc/100?img=${n}`} alt="User" />)}
            </div>
            <p className="text-sm text-white font-medium">Más de <span className="font-bold">500+</span> clientes confían en nosotros</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 bg-[#f8fafc]">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <Link to="/" className="flex lg:hidden items-center justify-center gap-3 text-[#1e2730] mb-10 hover:opacity-80 transition-opacity">
            <svg className="w-10 h-10 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 15l2-2 2 2" />
            </svg>
            <span className="font-bold text-xl tracking-wide">Nombre Empresa</span>
          </Link>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-[#1e2730] mb-3">Iniciar Sesión</h2>
            <p className="text-gray-500">Ingresa tus credenciales para continuar.</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1e2730] mb-1.5">Correo Electrónico</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@empresa.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959] outline-none transition-all bg-gray-50 focus:bg-white text-gray-800"
                required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1e2730] mb-1.5">Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ea5959]/20 focus:border-[#ea5959] outline-none transition-all bg-gray-50 focus:bg-white text-gray-800"
                required />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 px-4 bg-[#ea5959] hover:bg-[#d94848] disabled:opacity-60 text-white rounded-xl font-bold shadow-[0_8px_20px_rgba(234,89,89,0.25)] transition-all active:scale-[0.98]">
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
