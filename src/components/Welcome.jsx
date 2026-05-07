import React from "react";

export default function Welcome() {
  return (
    <div className="w-full bg-white pt-24 pb-16 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-[1.3rem] md:text-[1.4rem] text-[#35404d] font-normal leading-relaxed mb-20">
          <span className="font-bold">Bienvenido</span>, somos <span className="text-[#e8524b] font-bold">CreaLab Group</span> una Agencia de <span className="font-bold">Innovación y Desarrollo de Software.</span><br className="hidden md:block"/>
          Nuestro foco está en la <span className="font-bold">programación</span>, la <span className="font-bold">experiencia de usuario</span> y el impacto de <span className="font-bold">grandes ideas.</span>
        </h2>

        <div className="relative inline-block mt-4">
          <h3 className="text-4xl md:text-[2.7rem] font-bold text-[#35404d] tracking-tight">
            Qué <span className="relative inline-block pb-1">
              hacemos
              <span className="absolute bottom-[2px] left-0 w-full h-[3px] bg-[#e8524b]"></span>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
