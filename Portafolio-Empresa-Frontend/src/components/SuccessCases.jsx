import React from "react";
import { useSite } from "../context/SiteContext";

const CARD_GRADIENTS = [
  "from-blue-500/20 to-blue-600/10",
  "from-purple-500/20 to-purple-600/10",
  "from-emerald-500/20 to-emerald-600/10",
  "from-amber-500/20 to-amber-600/10",
  "from-pink-500/20 to-pink-600/10",
  "from-teal-500/20 to-teal-600/10",
];

const CARD_DOTS = [
  "bg-blue-400",
  "bg-purple-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-pink-400",
  "bg-teal-400",
];

export default function SuccessCases() {
  const { portfolio, technologies, testimonials } = useSite() ?? {};

  const projects = portfolio?.slice(0, 6) ?? [];
  const techStack = technologies ?? [];
  const reviews = testimonials ?? [];

  const stats = [
    projects.length > 0 && { value: `${projects.length}+`, label: 'Proyectos' },
    reviews.length > 0  && { value: `${reviews.length}+`,  label: 'Reseñas' },
    techStack.length > 0 && { value: `${techStack.length}+`, label: 'Tecnologías' },
  ].filter(Boolean);

  if (!projects.length && !techStack.length && !reviews.length) return null;

  return (
    <div className="w-full bg-white py-28 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16">

        {/* Left: text + testimonials */}
        <div className="flex-1 text-left lg:sticky lg:top-12">
          <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-3">Portafolio</p>
          <h2 className="text-5xl md:text-6xl font-black text-[#35404d] leading-tight mb-4">
            CASOS DE<br /><span className="text-[#ea5959]">ÉXITO</span>
          </h2>
          <h3 className="text-xl font-bold text-gray-500 mb-6">Grandes desafíos, soluciones reales.</h3>
          <p className="text-gray-500 text-base mb-8 max-w-md leading-relaxed">
            Hemos tomado proyectos de distintos tamaños dando una{' '}
            <strong className="text-gray-700">solución oportuna y eficiente</strong> a cada desafío.
          </p>

          {/* Tech stack badges */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((t) => (
                <span key={t.id ?? t.name}
                  className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                  {t.name}
                </span>
              ))}
            </div>
          )}

          {/* Testimonials */}
          {reviews.length > 0 && (
            <div className="mb-9 space-y-3">
              {reviews.slice(0, 2).map((t) => (
                <div key={t.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-sm text-gray-600 italic mb-2">"{t.content}"</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1e2730]">{t.client_name}</span>
                    {t.rating > 0 && (
                      <span className="text-[#ea5959] text-xs">{'★'.repeat(t.rating)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#ea5959] text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-[#d64a4a] hover:shadow-lg hover:-translate-y-0.5 transition-all">
            HABLEMOS DE TU PROYECTO
          </button>
        </div>

        {/* Right: project cards + stats */}
        <div className="flex-1 w-full">
          {projects.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {projects.map((p, i) => (
                <div key={p.id}
                  onClick={() => p.demo_url && p.demo_url !== '#' && window.open(p.demo_url, '_blank')}
                  className={`bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${p.demo_url && p.demo_url !== '#' ? 'cursor-pointer' : ''}`}>
                  <div className={`w-3 h-3 rounded-full ${CARD_DOTS[i % CARD_DOTS.length]} mb-4`} />
                  <span className="text-[0.6rem] font-bold tracking-widest text-gray-400 uppercase block mb-1">
                    {p.project?.status ?? 'Proyecto'}
                  </span>
                  <h5 className="font-bold text-[#35404d] text-sm leading-snug">{p.title}</h5>
                  {p.description && (
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Stats bar */}
          {stats.length > 0 && (
            <div className="bg-gradient-to-r from-[#35404d] to-[#2d3848] rounded-2xl p-5 flex justify-around">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black text-[#ea5959]">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
