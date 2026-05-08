import React from 'react';
import { useSite } from '../context/SiteContext';

const TECH_COLORS = [
  'text-[#ea5959] bg-[#ea5959]/10 border-[#ea5959]/20',
  'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'text-amber-400 bg-amber-400/10 border-amber-400/20',
];

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function PlaceholderBg({ className = '' }) {
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-[#ea5959]/20 via-[#2d3848] to-[#1e2730] ${className}`}>
      <svg className="w-16 h-16 text-[#ea5959]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

function FeaturedCard({ item }) {
  const img   = item.project?.images?.[0]?.image_url;
  const techs = item.project?.technologies ?? [];
  const hasDemo = item.demo_url && item.demo_url !== '#';

  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#1e2730] border border-white/10 group flex flex-col h-full hover:border-[#ea5959]/40 transition-all duration-300 shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2730] via-[#1e2730]/20 to-transparent z-10" />
        {img
          ? <img src={img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          : <PlaceholderBg className="h-full" />
        }
        {hasDemo && (
          <a href={item.demo_url} target="_blank" rel="noreferrer"
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ea5959]">
            <ExternalIcon />
          </a>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1">
        {techs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techs.slice(0, 5).map((t, i) => (
              <span key={t.id ?? t.name}
                className={`px-2.5 py-1 text-[0.6rem] font-bold tracking-wider uppercase rounded-full border ${TECH_COLORS[i % TECH_COLORS.length]}`}>
                {t.name}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-2xl font-black text-white mb-3 leading-tight">{item.title}</h3>
        {item.description && (
          <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">{item.description}</p>
        )}

        {hasDemo && (
          <a href={item.demo_url} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-[#ea5959] text-sm font-bold hover:gap-4 transition-all mt-auto">
            Ver proyecto <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}

function SmallCard({ item }) {
  const img   = item.project?.images?.[0]?.image_url;
  const techs = item.project?.technologies ?? [];
  const hasDemo = item.demo_url && item.demo_url !== '#';

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#1e2730] border border-white/10 group flex flex-col hover:border-[#ea5959]/40 transition-all duration-300 shadow-xl">
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2730] via-transparent to-transparent z-10" />
        {img
          ? <img src={img} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
          : <PlaceholderBg className="h-full" />
        }
      </div>

      <div className="p-5 flex flex-col flex-1">
        {techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {techs.slice(0, 3).map((t, i) => (
              <span key={t.id ?? t.name}
                className={`px-2 py-0.5 text-[0.55rem] font-bold tracking-wider uppercase rounded-full border ${TECH_COLORS[i % TECH_COLORS.length]}`}>
                {t.name}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-base font-bold text-white mb-1.5 leading-snug">{item.title}</h3>
        {item.description && (
          <p className="text-xs text-gray-400 leading-relaxed flex-1 line-clamp-2">{item.description}</p>
        )}
        {hasDemo && (
          <a href={item.demo_url} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#ea5959] text-xs font-bold hover:gap-3 transition-all mt-4">
            Ver proyecto <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const { portfolio, loading } = useSite() ?? {};

  if (loading || !portfolio?.length) return null;

  const [featured, ...rest] = portfolio;

  return (
    <section id="proyectos" className="py-28 bg-[#2d3848] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#ea5959] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-3">Portafolio</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Proyectos<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea5959] to-[#f07850]">
                Destacados
              </span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
            Soluciones digitales de alto impacto que transformaron negocios reales.
          </p>
        </div>

        {/* Featured + stack layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeaturedCard item={featured} />
          </div>

          {rest.length > 0 && (
            <div className="flex flex-col gap-6">
              {rest.slice(0, 2).map((item) => (
                <SmallCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Additional items */}
        {rest.length > 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {rest.slice(2).map((item) => (
              <SmallCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
