import React from "react";
import { useSite } from "../context/SiteContext";

const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  const { company, portfolio, testimonials, technologies, loading } = useSite() ?? {};

  const name = company?.name ?? '';
  const description = company?.description ?? '';

  const stats = [
    portfolio?.length > 0 && { value: `${portfolio.length}+`, label: 'Proyectos' },
    testimonials?.length > 0 && { value: `${testimonials.length}+`, label: 'Reseñas' },
    technologies?.length > 0 && { value: `${technologies.length}+`, label: 'Tecnologías' },
  ].filter(Boolean);

  return (
    <div className="relative w-full min-h-[720px] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-28 pb-44">
      <div className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')" }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#c93f3f] via-[#d44848] to-[#f28e5a] opacity-92" />
      <div className="absolute inset-0 z-0 bg-[#1a0a0a]/15" />
      <div className="absolute top-1/4 left-8 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-8 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-5 py-2.5 rounded-full mb-8 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Innovación · Software · Diseño · Tecnología
        </div>

        <h1 className="text-[2.4rem] md:text-[3.8rem] lg:text-[4.5rem] text-white font-black leading-[1.05] mb-6 tracking-tight drop-shadow-lg">
          {name ? `${name}` : 'Te ayudamos a crear'}
          <span className="block mt-1">Soluciones Innovadoras</span>
          <span className="block text-white/90 text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-medium mt-1">para tu negocio.</span>
        </h1>

        {description && (
          <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={() => scrollTo("#casos")}
            className="border-2 border-white text-white font-bold px-10 py-3.5 rounded-lg hover:bg-white hover:text-[#e8524b] transition-all text-sm tracking-widest">
            CASOS DE ÉXITO
          </button>
          <button onClick={() => scrollTo("#contacto")}
            className="bg-white text-[#e8524b] font-bold px-10 py-3.5 rounded-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all text-sm tracking-widest">
            CONTÁCTANOS
          </button>
        </div>

        {stats.length > 0 && (
          <div className="flex flex-wrap justify-center divide-x divide-white/20 mt-16">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center px-8 py-2">
                <span className="text-3xl font-black text-white">{value}</span>
                <span className="text-xs font-medium text-white/65 tracking-wide uppercase mt-1">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden z-10">
        <svg className="block w-[calc(100%+1px)] h-[100px] md:h-[150px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.2,192.39,101.4c60.36-17.51,114.93-49.33,178.61-44.96z" fill="rgba(255,255,255,0.25)" />
          <path d="M1200,120V73.28C1109.11,111.45,1009.6,116.14,917,89.54c-70.39-20.24-135.53-56.12-208.57-65.43-78.7-10-155.8,11.23-231.25,32.73-82.68,23.59-168.32,44.75-255.45,41-71.3-3.12-140-27.27-210.51-40.45A467.57,467.57,0,0,0,0,51V120H1200Z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}
