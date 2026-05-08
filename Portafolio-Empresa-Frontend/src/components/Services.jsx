import React from "react";
import { useSite } from "../context/SiteContext";

export default function Services() {
  const { services } = useSite() ?? {};

  const fallback = [
    { id: 1, number: "01", tag: "MVP",        name: "Prototipado y Validación",    description: "Tomamos proyectos o ideas de negocio y desarrollamos un MVP para validar tempranamente en el mercado." },
    { id: 2, number: "02", tag: "SOFTWARE",   name: "Aplicaciones a la Medida",    description: "Software a la medida, aplicaciones web y móviles nativas con las mejores tecnologías del mercado." },
    { id: 3, number: "03", tag: "INNOVACIÓN", name: "Consultoría en Innovación",   description: "Ayudamos a tu empresa a identificar oportunidades de innovación y ejecutar estrategias de transformación digital." },
  ];

  const items = services?.length > 0
    ? services.map((s, i) => ({ ...s, number: String(i + 1).padStart(2, '0'), tag: s.estimated_time || 'SERVICIO' }))
    : fallback;

  return (
    <div className="relative w-full py-28 px-4 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #ea5959 0%, #e8524b 40%, #f07850 100%)" }}>
      <div className="absolute top-[-60px] left-[-5%] w-[110%] h-[120px] bg-white rounded-[50%] z-10" />
      <div className="relative z-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16">
          {items.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-5xl font-black text-gray-100">{s.number}</span>
              </div>
              <span className="inline-block text-[0.6rem] font-bold tracking-widest text-[#ea5959] bg-red-50 px-2.5 py-1 rounded-full mb-3 w-fit">
                {s.tag}
              </span>
              <h4 className="text-lg font-bold text-[#35404d] mb-3">{s.name}</h4>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.description}</p>
              {s.base_price && (
                <p className="mt-3 text-sm font-semibold text-[#ea5959]">Desde ${s.base_price}</p>
              )}
              <a href="#casos" onClick={(e) => { e.preventDefault(); document.querySelector("#casos")?.scrollIntoView({ behavior: "smooth" }); }}
                className="mt-6 inline-flex items-center gap-1.5 text-[#ea5959] text-sm font-semibold hover:gap-3 transition-all">
                Ver casos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-white text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
          Nuestro equipo cuenta con experticia en <strong>Marketing, Tecnología y Negocios</strong> para asesorarte integralmente.
        </p>
      </div>
      <div className="absolute bottom-[-60px] left-[-5%] w-[110%] h-[120px] bg-white rounded-[50%] z-10" />
    </div>
  );
}
