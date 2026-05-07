import React from "react";

export default function SuccessCases() {
  return (
    <div className="w-full bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 text-left z-10">
          <h2 className="text-4xl md:text-6xl font-black text-[#35404d] leading-tight mb-4 tracking-tight">
            CASOS DE <br />
            ÉXITO
          </h2>
          <h3 className="text-2xl font-bold text-[#ea5959] mb-6">
            Grandes Desafíos.
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-md leading-relaxed">
            Hemos tomado proyectos de distintos tamaños, dando una <span className="font-bold text-gray-800">solución oportuna y eficiente</span> a cada uno de estos desafíos. Además hemos emprendido en proyectos propios que han resultado exitosamente.
          </p>
          <button 
            className="bg-[#ea5959] text-white font-bold px-8 py-4 rounded shadow-md hover:bg-[#d64a4a] transition-colors"
          >
            VER CASOS
          </button>
        </div>

        {/* Dashboard Mockups (CSS only representation since we lack the image) */}
        <div className="flex-1 relative h-[400px] w-full flex items-center justify-center">
          {/* Card 1: Background blue */}
          <div className="absolute right-[60%] top-10 w-64 h-80 bg-[#3498db] rounded-lg shadow-xl -rotate-6 transform scale-90 opacity-80 border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-white/20"></div>
              <div className="h-4 w-24 bg-white/30 rounded"></div>
            </div>
            <div className="h-8 w-40 bg-white/40 rounded mb-4"></div>
            <div className="h-4 w-full bg-white/20 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-white/20 rounded mb-8"></div>
            <div className="h-10 w-full bg-white rounded mt-auto"></div>
          </div>
          
          {/* Card 2: Middle dark */}
          <div className="absolute right-[40%] top-4 w-64 h-[350px] bg-[#2c3e50] rounded-lg shadow-2xl -rotate-3 transform scale-95 border border-gray-700 p-0 flex overflow-hidden">
            <div className="w-16 bg-[#1a252f] h-full flex flex-col items-center py-4 gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 mb-4"></div>
              <div className="w-6 h-6 rounded bg-white/5"></div>
              <div className="w-6 h-6 rounded bg-white/5"></div>
              <div className="w-6 h-6 rounded bg-white/5"></div>
            </div>
            <div className="flex-1 p-4">
              <div className="h-6 w-32 bg-white/10 rounded mb-6"></div>
              <div className="h-12 w-full bg-white/5 rounded mb-4"></div>
              <div className="h-12 w-full bg-white/5 rounded mb-4"></div>
            </div>
          </div>

          {/* Card 3: Main dashboard white */}
          <div className="absolute right-0 top-0 w-[450px] h-[380px] bg-white rounded-lg shadow-2xl z-20 border border-gray-200 overflow-hidden flex flex-col">
            <div className="h-12 bg-[#2c3e50] w-full flex items-center px-4 gap-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="h-4 w-24 bg-white/20 rounded ml-4"></div>
            </div>
            <div className="flex-1 p-6 flex flex-col gap-3">
              {/* Fake list items */}
              <div className="w-full h-14 border border-gray-100 rounded-md flex items-center px-4 gap-4 bg-gray-50">
                <div className="w-8 h-8 rounded bg-red-100"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-8 flex-1 bg-red-400 rounded-full ml-4 opacity-70"></div>
              </div>
              <div className="w-full h-14 border border-gray-100 rounded-md flex items-center px-4 gap-4 bg-gray-50">
                <div className="w-8 h-8 rounded bg-yellow-100"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-8 flex-1 bg-yellow-400 rounded-full ml-4 opacity-70"></div>
              </div>
              <div className="w-full h-14 border border-gray-100 rounded-md flex items-center px-4 gap-4 bg-gray-50">
                <div className="w-8 h-8 rounded bg-blue-100"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-8 flex-1 bg-blue-400 rounded-full ml-4 opacity-70"></div>
              </div>
              <div className="w-full h-14 border border-gray-100 rounded-md flex items-center px-4 gap-4 bg-gray-50">
                <div className="w-8 h-8 rounded bg-green-100"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-8 flex-1 bg-green-400 rounded-full ml-4 opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
