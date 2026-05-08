import React from 'react';
import { useSite } from '../context/SiteContext';

export default function Projects() {
  const { portfolio } = useSite() ?? {};

  const fallback = [
    { id: 1, title: "AutoMARK - AI", description: "Sistema de calificación automática.", demo_url: "#", project: { technologies: [{ name: "Python" }, { name: "Automation" }], images: [{ image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400" }] } },
    { id: 2, title: "FileIQ - Document Intelligence", description: "Asistente de IA para documentos.", demo_url: "#", project: { technologies: [{ name: "Python" }, { name: "LangChain" }], images: [{ image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600&h=400" }] } },
    { id: 3, title: "PizzAi - Bot", description: "Bot de pedidos de pizza con IA.", demo_url: "#", project: { technologies: [{ name: "Python" }, { name: "NLP" }], images: [{ image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600&h=400" }] } },
  ];

  const items = portfolio?.length > 0 ? portfolio : fallback;

  return (
    <section id="proyectos" className="py-24 bg-[#2d3848] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ea5959] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ea5959] mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una muestra de proyectos, destacando soluciones digitales de alto impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => {
            const img   = item.project?.images?.[0]?.image_url;
            const techs = item.project?.technologies ?? [];
            return (
              <div key={item.id} className="bg-[#1e2730] rounded-3xl border border-gray-800 overflow-hidden hover:border-[#ea5959]/50 transition-all duration-300 group flex flex-col h-full shadow-2xl relative">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2730] via-transparent to-transparent z-10 opacity-90" />
                  {img && <img src={img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />}
                </div>
                <div className="p-8 flex flex-col flex-grow relative z-20">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-8 text-center leading-relaxed flex-grow">{item.description}</p>
                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                      {techs.map((t) => (
                        <span key={t.id ?? t.name} className="px-3 py-1.5 text-[0.65rem] font-bold tracking-wider uppercase text-[#ea5959] bg-[#ea5959]/10 rounded-full border border-[#ea5959]/20">
                          {t.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.demo_url && item.demo_url !== '#' && (
                    <div className="flex justify-center mt-auto">
                      <a href={item.demo_url} target="_blank" rel="noreferrer"
                        className="px-6 py-2.5 rounded-full bg-[#ea5959] text-white text-sm font-bold hover:bg-[#d94848] transition-colors">
                        Ver Demo
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
