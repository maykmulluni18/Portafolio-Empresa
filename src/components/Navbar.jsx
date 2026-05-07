import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#465463] text-white py-3 px-8 flex items-center justify-between shadow-sm relative z-50">
      <div className="flex items-center gap-3">
        {/* Simple cloud icon matching Crealab Logo closely */}
        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 15l2-2 2 2"></path>
        </svg>
        <p className="font-bold text-inherit text-[1.1rem] tracking-wide">CreaLab Group</p>
      </div>
      
      <div className="hidden lg:flex items-center gap-7 text-[0.8rem] font-bold tracking-wider">
        <a href="#" className="text-white hover:text-gray-300 relative after:content-[''] after:absolute after:-bottom-[14px] after:left-0 after:w-full after:h-[2px] after:bg-[#e8524b]">
          HOME
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          CASOS DE ÉXITO
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          CREALAB STORIES
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          MVP
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
          <span role="img" aria-label="US Flag" className="text-base">🇺🇸</span> ENGLISH SITE
        </a>
      </div>
    </nav>
  );
}
