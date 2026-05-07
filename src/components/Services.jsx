import React from "react";

const services = [
  {
    number: "01",
    tag: "MVP",
    title: "Prototipado y Validación",
    description:
      "Tomamos proyectos o ideas de negocio y desarrollamos un MVP para validar tempranamente en el mercado, reduciendo riesgos y maximizando aprendizajes.",
    icon: (
      <svg className="w-7 h-7 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    tag: "SOFTWARE",
    title: "Aplicaciones a la Medida",
    description:
      "Te escuchamos y luego desarrollamos. Software a la medida, aplicaciones web y móviles nativas con las mejores tecnologías del mercado.",
    icon: (
      <svg className="w-7 h-7 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "03",
    tag: "INNOVACIÓN",
    title: "Consultoría en Innovación",
    description:
      "Ayudamos a tu empresa a identificar oportunidades de innovación, validar nuevos productos o servicios y ejecutar estrategias de transformación digital.",
    icon: (
      <svg className="w-7 h-7 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <div
      className="relative w-full py-28 px-4 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #ea5959 0%, #e8524b 40%, #f07850 100%)" }}
    >
      {/* Top curve */}
      <div className="absolute top-[-60px] left-[-5%] w-[110%] h-[120px] bg-white rounded-[50%] z-10" />

      <div className="relative z-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16">
          {services.map((s) => (
            <div
              key={s.number}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="text-5xl font-black text-gray-100">{s.number}</span>
              </div>
              <span className="inline-block text-[0.6rem] font-bold tracking-widest text-[#ea5959] bg-red-50 px-2.5 py-1 rounded-full mb-3 w-fit">
                {s.tag}
              </span>
              <h4 className="text-lg font-bold text-[#35404d] mb-3">{s.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.description}</p>
              <a
                href="#casos"
                onClick={(e) => { e.preventDefault(); document.querySelector("#casos")?.scrollIntoView({ behavior: "smooth" }); }}
                className="mt-6 inline-flex items-center gap-1.5 text-[#ea5959] text-sm font-semibold hover:gap-3 transition-all"
              >
                Ver casos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-white text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
          Nuestro equipo cuenta con experticia en{" "}
          <strong>Marketing, Tecnología y Negocios</strong> para asesorarte integralmente.
        </p>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-[-60px] left-[-5%] w-[110%] h-[120px] bg-white rounded-[50%] z-10" />
    </div>
  );
}
