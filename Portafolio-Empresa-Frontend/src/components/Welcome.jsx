import React from "react";
import { useSite } from "../context/SiteContext";

export default function Welcome() {
  const { company, portfolio, services } = useSite() ?? {};

  const name        = company?.name        ?? "Nombre Empresa";
  const description = company?.description ?? null;

  const stats = [
    { value: portfolio?.length > 0 ? `${portfolio.length}+` : "30+", label: "Proyectos exitosos",   icon: "🏆" },
    { value: "50+",                                                    label: "Clientes satisfechos", icon: "🤝" },
    { value: services?.length > 0 ? `${services.length}+` : "5+",     label: "Servicios activos",    icon: "🚀" },
  ];

  return (
    <div className="w-full bg-white pt-20 pb-20 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <p className="text-center text-[1.15rem] md:text-[1.3rem] text-[#35404d] leading-relaxed mb-14 max-w-3xl">
          <span className="font-bold">Bienvenido</span>, somos{" "}
          <span className="text-[#e8524b] font-bold">{name}</span> — una Agencia de{" "}
          <span className="font-bold">Innovación y Desarrollo de Software.</span>
          {description && (
            <>
              <br className="hidden md:block" />
              <span className="text-gray-600 text-base"> {description}</span>
            </>
          )}
          {!description && (
            <>
              <br className="hidden md:block" />
              Nuestro foco está en la <span className="font-bold">programación</span>, la{" "}
              <span className="font-bold">experiencia de usuario</span> y el impacto de{" "}
              <span className="font-bold">grandes ideas.</span>
            </>
          )}
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {stats.map(({ value, label, icon }) => (
            <div key={label} className="flex flex-col items-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50">
              <span className="text-3xl mb-3">{icon}</span>
              <span className="text-5xl font-black text-[#ea5959] mb-1">{value}</span>
              <span className="text-sm font-medium text-gray-500 text-center">{label}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-4">Lo que hacemos</p>
          <h3 className="text-4xl md:text-5xl font-black text-[#35404d] tracking-tight mb-4">Nuestros Servicios</h3>
          <div className="w-16 h-[3px] bg-[#ea5959] rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}
