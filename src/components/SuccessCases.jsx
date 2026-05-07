import React from "react";

const projects = [
  { name: "Plataforma E-Commerce",  type: "Web App",   color: "bg-blue-500",   emoji: "🛒" },
  { name: "App de Gestión Interna", type: "Dashboard", color: "bg-purple-500", emoji: "📊" },
  { name: "Marketplace B2B",        type: "Web App",   color: "bg-green-500",  emoji: "🤝" },
  { name: "App de Delivery",        type: "Mobile",    color: "bg-orange-500", emoji: "🚀" },
];

const techStack = ["React", "Node.js", "React Native", "Python", "AWS", "Figma"];

export default function SuccessCases() {
  return (
    <div className="w-full bg-white py-28 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Text */}
        <div className="flex-1 text-left">
          <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-3">Portafolio</p>
          <h2 className="text-5xl md:text-6xl font-black text-[#35404d] leading-tight mb-4">
            CASOS DE
            <br />
            <span className="text-[#ea5959]">ÉXITO</span>
          </h2>
          <h3 className="text-xl font-bold text-gray-500 mb-6">Grandes desafíos, soluciones reales.</h3>
          <p className="text-gray-500 text-base mb-7 max-w-md leading-relaxed">
            Hemos tomado proyectos de distintos tamaños dando una{" "}
            <strong className="text-gray-700">solución oportuna y eficiente</strong> a cada desafío.
            También emprendimos en proyectos propios que resultaron exitosamente.
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-9">
            {techStack.map((t) => (
              <span key={t} className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[#ea5959] text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-[#d64a4a] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            VER TODOS LOS CASOS
          </button>
        </div>

        {/* Project cards + stats */}
        <div className="flex-1 w-full max-w-md">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {projects.map(({ name, type, color, emoji }) => (
              <div
                key={name}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {emoji}
                </div>
                <span className="text-[0.6rem] font-bold tracking-widest text-gray-400 uppercase">{type}</span>
                <h5 className="font-bold text-[#35404d] text-sm mt-1 leading-snug">{name}</h5>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="bg-gradient-to-r from-[#35404d] to-[#2d3848] rounded-2xl p-5 flex justify-around">
            {[
              { value: "100%", label: "Satisfacción" },
              { value: "15+",  label: "Industrias" },
              { value: "2x",   label: "Crecimiento" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-[#ea5959]">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
