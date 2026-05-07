import React from "react";

export default function Services() {
  const services = [
    {
      title: "Prototipado y validación",
      description: "Tomamos proyectos o ideas de negocio y desarrollamos un MVP para validar tempranamente en el mercado.",
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 9l5-3M10 5l5 3"></path>
        </svg>
      )
    },
    {
      title: "Aplicaciones a la medida",
      description: "Te escuchamos y luego desarrollamos. Desarrollamos Software a medida. Aplicaciones web y móviles nativas.",
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      )
    },
    {
      title: "Innovación",
      description: "Ayudamos a tu empresa a identificar oportunidades de innovación, y a validar un nuevo producto o servicio.",
      icon: (
        <svg className="w-16 h-16 mx-auto mb-4 text-[#f48c61]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full bg-gradient-to-r from-[#ea5959] to-[#eb6862] py-28 px-4 overflow-hidden">
      {/* Top slight curve mask using border radius */}
      <div className="absolute top-[-50px] left-[-10%] w-[120%] h-[100px] bg-white rounded-[50%] z-10"></div>

      <div className="relative z-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl py-10 px-6 shadow-xl hover:shadow-2xl transition-shadow border-none flex flex-col items-center text-center">
              {service.icon}
              <h4 className="text-lg font-bold text-[#35404d] mb-4">{service.title}</h4>
              <p className="text-sm text-gray-500 mb-8 min-h-[60px] leading-relaxed">
                {service.description}
              </p>
              <a href="#" className="text-[#ea5959] text-sm font-medium hover:underline">
                Ver Portafolio
              </a>
            </div>
          ))}
        </div>

        <div className="text-center text-white max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            Nuestro trabajo no es sólo técnico. Nuestro equipo cuenta con la experticia para asesorar en Marketing, Tecnología y Negocios.
          </p>
        </div>
      </div>

      {/* Bottom slight curve mask */}
      <div className="absolute bottom-[-50px] left-[-10%] w-[120%] h-[100px] bg-white rounded-[50%] z-10"></div>
    </div>
  );
}
