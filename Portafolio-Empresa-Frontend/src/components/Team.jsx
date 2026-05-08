import React from "react";
import { useSite } from "../context/SiteContext";

const fallbackRoles = [
  { title: "Ingenieros",    icon: "⚙️" },
  { title: "Programadores", icon: "💻" },
  { title: "Diseñadores",   icon: "🎨" },
  { title: "Marketers",     icon: "📣" },
];

const values = ["Innovación", "Calidad", "Agilidad", "Colaboración", "Impacto"];

export default function Team() {
  const { team, company } = useSite() ?? {};

  const members = team?.length > 0 ? team : null;

  return (
    <section id="equipo" className="w-full bg-[#f8f9fa] border-t border-gray-100 py-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden shadow-lg">
        {/* Visual side */}
        <div className="w-full lg:w-1/2 min-h-[420px] relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2d3848 0%, #35404d 60%, #3d4d5e 100%)" }}>
          <div className="absolute inset-0 opacity-[0.08]">
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 8 }).map((_, c) => (
                <div key={`${r}-${c}`} className="absolute w-1.5 h-1.5 rounded-full bg-white"
                  style={{ top: `${r * 15 + 8}%`, left: `${c * 13 + 4}%` }} />
              ))
            )}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
            <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-6">Nuestro equipo</p>

            {members ? (
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {members.slice(0, 4).map((m) => (
                  <div key={m.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 text-center hover:bg-white/20 transition-colors">
                    {m.avatar ? (
                      <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover mx-auto mb-2" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#ea5959] flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                        {m.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <div className="text-white font-bold text-xs leading-snug">{m.name}</div>
                    {m.bio && <div className="text-white/50 text-[10px] mt-0.5 line-clamp-1">{m.bio}</div>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {fallbackRoles.map(({ title, icon }) => (
                  <div key={title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 text-center hover:bg-white/20 transition-colors">
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="text-white font-bold text-sm">{title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Text side */}
        <div className="w-full lg:w-1/2 py-16 px-10 md:px-16 bg-white flex flex-col justify-center">
          <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-3">Quiénes somos</p>
          <h2 className="text-5xl font-black text-[#35404d] tracking-tight mb-4">EQUIPO</h2>

          {company?.mission ? (
            <h3 className="text-xl font-bold text-[#ea5959] mb-6">{company.mission.substring(0, 80)}</h3>
          ) : (
            <h3 className="text-xl font-bold text-[#ea5959] mb-6">Somos jóvenes, no novatos.</h3>
          )}

          <p className="text-gray-500 text-base mb-8 leading-relaxed max-w-md">
            {company?.vision ?? "Un equipo íntegro de"}{" "}
            {!company?.vision && <><strong className="text-gray-700">profesionales y expertos</strong> en diferentes disciplinas. Todo lo que necesitas para ejecutar tu proyecto de forma exitosa.</>}
          </p>

          {members && members.length > 4 && (
            <p className="text-sm text-gray-400 mb-4">+{members.length - 4} miembros más en el equipo</p>
          )}

          <div className="flex flex-wrap gap-2 mb-10">
            {values.map((v) => (
              <span key={v} className="text-xs font-semibold border border-[#ea5959] text-[#ea5959] px-3 py-1 rounded-full">{v}</span>
            ))}
          </div>

          <button onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="w-fit bg-[#ea5959] text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-[#d64a4a] hover:shadow-lg hover:-translate-y-0.5 transition-all">
            CONOCER EL EQUIPO
          </button>
        </div>
      </div>
    </section>
  );
}
