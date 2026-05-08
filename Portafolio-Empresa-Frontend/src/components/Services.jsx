import React, { useState } from "react";
import { useSite } from "../context/SiteContext";

const ICONS = [
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
];

const INITIAL = 3;

export default function Services() {
  const { services } = useSite() ?? {};
  const [showAll, setShowAll] = useState(false);

  if (!services?.length) return null;

  const visible = showAll ? services : services.slice(0, INITIAL);
  const hasMore = services.length > INITIAL;

  return (
    <div id="servicios-section" className="relative w-full py-28 px-4"
      style={{ background: "linear-gradient(135deg, #ea5959 0%, #e8524b 40%, #f07850 100%)" }}>

      {/* Top wave */}
      <div className="absolute top-[-60px] left-[-5%] w-[110%] h-[120px] bg-white rounded-[50%] z-10" />

      <div className="relative z-20 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-3">Lo que hacemos</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Nuestros Servicios</h2>
          <p className="text-white/70 max-w-lg mx-auto text-sm">
            Soluciones integrales adaptadas a las necesidades de tu negocio.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
          {visible.map((s, i) => (
            <div key={s.id}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">

              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ea5959] to-[#f07850] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {ICONS[i % ICONS.length]}
                </div>
                <span className="text-5xl font-black text-gray-100 select-none leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {s.estimated_time && (
                <span className="inline-block text-[0.6rem] font-bold tracking-widest text-[#ea5959] bg-red-50 px-2.5 py-1 rounded-full mb-3 w-fit uppercase">
                  {s.estimated_time}
                </span>
              )}

              <h4 className="text-lg font-bold text-[#35404d] mb-3">{s.name}</h4>

              {s.description && (
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.description}</p>
              )}

              {s.base_price && (
                <p className="mt-4 text-sm font-semibold text-[#ea5959]">
                  Desde ${Number(s.base_price).toLocaleString()}
                </p>
              )}

              <a href="#casos"
                onClick={(e) => { e.preventDefault(); document.querySelector('#casos')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="mt-6 inline-flex items-center gap-1.5 text-[#ea5959] text-sm font-semibold hover:gap-3 transition-all">
                Ver casos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Ver más / Ver menos */}
        {hasMore && (
          <div className="flex justify-center mb-16">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-bold px-8 py-3.5 rounded-full transition-all backdrop-blur-sm text-sm tracking-wide">
              {showAll ? (
                <>
                  Ver menos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Ver {services.length - INITIAL} servicios más
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        <p className="text-center text-white text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
          Nuestro equipo cuenta con experticia en{' '}
          <strong>Marketing, Tecnología y Negocios</strong> para asesorarte integralmente.
        </p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-[-60px] left-[-5%] w-[110%] h-[120px] bg-white rounded-[50%] z-10" />
    </div>
  );
}
