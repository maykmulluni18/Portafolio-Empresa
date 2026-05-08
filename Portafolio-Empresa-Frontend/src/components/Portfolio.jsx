import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';

// ── helpers ───────────────────────────────────────────────────────────────────

const TECH_COLORS = [
  'text-[#ea5959] bg-[#ea5959]/10 border-[#ea5959]/20',
  'text-blue-600 bg-blue-50 border-blue-200',
  'text-purple-600 bg-purple-50 border-purple-200',
  'text-emerald-600 bg-emerald-50 border-emerald-200',
  'text-amber-600 bg-amber-50 border-amber-200',
];

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ExternalLink() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function ImgPlaceholder({ className = '' }) {
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}>
      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

// ── project cards ─────────────────────────────────────────────────────────────

function FeaturedCard({ item }) {
  const img    = item.project?.images?.[0]?.image_url;
  const techs  = item.project?.technologies ?? [];
  const hasUrl = item.demo_url && item.demo_url !== '#';

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-[#ea5959]/50 hover:shadow-xl transition-all duration-300 shadow-md flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent z-10" />
        {img
          ? <img src={img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          : <ImgPlaceholder className="h-full" />}
        {hasUrl && (
          <a href={item.demo_url} target="_blank" rel="noreferrer"
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#ea5959] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ea5959] hover:text-white shadow">
            <ExternalLink />
          </a>
        )}
      </div>
      <div className="p-7 flex flex-col flex-1">
        {techs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techs.slice(0, 5).map((t, i) => (
              <span key={t.id ?? t.name}
                className={`px-2.5 py-0.5 text-[0.6rem] font-bold tracking-wider uppercase rounded-full border ${TECH_COLORS[i % TECH_COLORS.length]}`}>
                {t.name}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl font-black text-[#35404d] mb-2 leading-tight">{item.title}</h3>
        {item.description && (
          <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{item.description}</p>
        )}
        {hasUrl && (
          <a href={item.demo_url} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-[#ea5959] text-sm font-bold hover:gap-4 transition-all mt-auto">
            Ver proyecto <ArrowRight />
          </a>
        )}
      </div>
    </div>
  );
}

function SmallCard({ item }) {
  const img    = item.project?.images?.[0]?.image_url;
  const techs  = item.project?.technologies ?? [];
  const hasUrl = item.demo_url && item.demo_url !== '#';

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-[#ea5959]/50 hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col">
      <div className="relative h-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent z-10" />
        {img
          ? <img src={img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          : <ImgPlaceholder className="h-full" />}
      </div>
      <div className="p-5 flex flex-col flex-1">
        {techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {techs.slice(0, 3).map((t, i) => (
              <span key={t.id ?? t.name}
                className={`px-2 py-0.5 text-[0.55rem] font-bold tracking-wider uppercase rounded-full border ${TECH_COLORS[i % TECH_COLORS.length]}`}>
                {t.name}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-sm font-bold text-[#35404d] mb-1.5 leading-snug">{item.title}</h3>
        {item.description && (
          <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-2">{item.description}</p>
        )}
        {hasUrl && (
          <a href={item.demo_url} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#ea5959] text-xs font-bold hover:gap-3 transition-all mt-3">
            Ver proyecto <ArrowRight />
          </a>
        )}
      </div>
    </div>
  );
}

// ── testimonial carousel ──────────────────────────────────────────────────────

function Testimonials({ items }) {
  const [idx, setIdx] = useState(0);
  if (!items.length) return null;
  const t = items[idx];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < (t.rating ?? 5) ? 'text-amber-400' : 'text-gray-200'}`}
            fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-gray-600 italic leading-relaxed mb-4">"{t.content}"</p>
      <p className="text-xs font-bold text-[#35404d]">{t.client_name}</p>

      {items.length > 1 && (
        <div className="flex gap-2 mt-4">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? 'bg-[#ea5959]' : 'bg-gray-200 hover:bg-gray-300'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

const INITIAL_ITEMS = 3;

export default function Portfolio() {
  const { portfolio, technologies, testimonials } = useSite() ?? {};
  const [showAll, setShowAll] = useState(false);

  const items      = portfolio ?? [];
  const techStack  = technologies ?? [];
  const reviews    = testimonials ?? [];

  if (!items.length && !techStack.length && !reviews.length) return null;

  const visibleItems = showAll ? items : items.slice(0, INITIAL_ITEMS);
  const hasMore = items.length > INITIAL_ITEMS;

  const [featured, ...rest] = visibleItems;

  const stats = [
    items.length > 0    && { value: `${items.length}+`,    label: 'Proyectos' },
    reviews.length > 0  && { value: `${reviews.length}+`,  label: 'Clientes satisfechos' },
    techStack.length > 0 && { value: `${techStack.length}+`, label: 'Tecnologías' },
  ].filter(Boolean);

  return (
    <section id="casos" className="bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-28 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-3">Portafolio</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#35404d] leading-tight">
              Proyectos &amp;<br />
              <span className="text-[#ea5959]">Casos de Éxito</span>
            </h2>
          </div>

          {stats.length > 0 && (
            <div className="flex gap-8">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-[#ea5959]">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Project cards ── */}
        {items.length > 0 && (
          <>
            {/* Featured + 2 stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {featured && (
                <div className="lg:col-span-2">
                  <FeaturedCard item={featured} />
                </div>
              )}
              {rest.length > 0 && (
                <div className="flex flex-col gap-6">
                  {rest.slice(0, 2).map((item) => (
                    <SmallCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Remaining cards (only when expanded) */}
            {showAll && rest.length > 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {rest.slice(2).map((item) => (
                  <SmallCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* Ver más / Ver menos */}
            {hasMore && (
              <div className="flex justify-center mt-4 mb-6">
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="inline-flex items-center gap-2 border-2 border-[#ea5959] text-[#ea5959] font-bold px-8 py-3.5 rounded-full hover:bg-[#ea5959] hover:text-white transition-all text-sm tracking-wide">
                  {showAll ? (
                    <>
                      Ver menos
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Ver {items.length - INITIAL_ITEMS} proyectos más
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Bottom: tech + testimonials + CTA ── */}
        {(techStack.length > 0 || reviews.length > 0) && (
          <div className="mt-16 pt-12 border-t border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: tech + CTA */}
            <div>
              <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-4">Stack tecnológico</p>
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {techStack.map((t) => (
                    <span key={t.id ?? t.name}
                      className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#ea5959]/50 hover:text-[#ea5959] transition-colors">
                      {t.name}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                Hemos tomado proyectos de distintos tamaños dando una{' '}
                <strong className="text-[#35404d]">solución oportuna y eficiente</strong> a cada desafío.
              </p>
              <button
                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 bg-[#ea5959] text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-[#d64a4a] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Hablemos de tu proyecto <ArrowRight />
              </button>
            </div>

            {/* Right: testimonials */}
            {reviews.length > 0 && (
              <div>
                <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-4">Lo que dicen nuestros clientes</p>
                <Testimonials items={reviews} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
