import React from "react";

export default function Team() {
  return (
    <div className="w-full bg-[#f8f9fa] flex flex-col md:flex-row items-center border-t border-gray-200">
      {/* Team Image Section (using a placeholder gradient/icon since we don't have the photo) */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[500px] bg-gray-300 relative overflow-hidden">
        {/* Placeholder for the team photo */}
        <div className="absolute inset-0 bg-[#35404d] flex flex-col items-center justify-center text-white p-8 text-center">
          <svg className="w-24 h-24 mb-4 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span className="text-xl font-medium text-gray-400">[Foto del Equipo CreaLab]</span>
        </div>
      </div>

      {/* Text Content Section */}
      <div className="w-full md:w-1/2 py-20 px-8 md:px-16 lg:px-24">
        <h2 className="text-4xl md:text-5xl font-black text-[#35404d] tracking-tight mb-4">
          EQUIPO
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-[#ea5959] mb-6">
          Somos jóvenes, no novatos.
        </h3>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md">
          Un equipo íntegro de <span className="font-bold text-gray-800">profesionales y expertos</span> en diferentes disciplinas: Ingenieros, programadores, diseñadores, marketeros y todo lo que necesitas para ejecutar tu proyecto de forma exitosa.
        </p>
        <button 
          className="bg-[#ea5959] text-white font-bold px-8 py-4 rounded shadow-md hover:bg-[#d64a4a] transition-colors"
        >
          SABER MÁS
        </button>
      </div>
    </div>
  );
}
