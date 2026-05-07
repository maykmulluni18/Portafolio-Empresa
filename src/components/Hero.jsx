import React from "react";

export default function Hero() {
  return (
    <div className="relative w-full min-h-[650px] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-24 pb-36">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      
      {/* Red/Orange Gradient Overlay matching Crealab */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#d44848]/90 to-[#f28e5a]/85 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#e8524b]/80 to-[#f28e5a]/80"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-8">
        <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] text-white font-medium leading-[1.1] mb-6 tracking-tight drop-shadow-md">
          Te ayudamos a crear <br />
          <span className="font-bold block mt-1">Soluciones Innovadoras</span>
          para tu negocio.
        </h1>
        
        <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow">
          Tomamos proyectos que no cualquiera podría tomar, y los <br className="hidden md:block" />
          hacemos de una forma que nadie podría hacer.<br />
          <span className="font-bold text-[1.05rem]">Resolvemos problemas con Metodologías de Innovación, <br className="hidden md:block" /> Software, Diseño y Tecnología.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-2">
          <button 
            className="border-[1.5px] border-white text-white font-bold px-9 py-3 rounded-md hover:bg-white/10 transition-colors text-sm tracking-wide"
          >
            CASOS DE EXITO
          </button>
          <button 
            className="bg-white text-[#e8524b] font-bold px-9 py-3 rounded-md shadow-md hover:bg-gray-50 transition-colors text-sm tracking-wide"
          >
            CONTÁCTANOS
          </button>
        </div>
      </div>

      {/* SVG Wave Bottom */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[130px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.2,192.39,101.4c60.36-17.51,114.93-49.33,178.61-44.96z" fill="rgba(255,255,255,0.4)"></path>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="rgba(255,255,255,0.6)"></path>
          <path d="M1200,120V73.28C1109.11,111.45,1009.6,116.14,917,89.54c-70.39-20.24-135.53-56.12-208.57-65.43-78.7-10-155.8,11.23-231.25,32.73-82.68,23.59-168.32,44.75-255.45,41-71.3-3.12-140-27.27-210.51-40.45A467.57,467.57,0,0,0,0,51V120H1200Z" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
}
