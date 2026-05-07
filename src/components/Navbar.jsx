import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "INICIO",        href: "#home" },
  { label: "SERVICIOS",     href: "#servicios" },
  { label: "CASOS DE ÉXITO", href: "#casos" },
  { label: "EQUIPO",        href: "#equipo" },
  { label: "CONTACTO",      href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState("INICIO");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (label, href) => {
    setActive(label);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-[#2d3848] shadow-lg" : "bg-[#465463]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav("INICIO", "#home"); }}
          className="flex items-center gap-3"
        >
          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 15l2-2 2 2" />
          </svg>
          <span className="font-bold text-white text-[1.05rem] tracking-wide">Nombre Empresa</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8 text-[0.75rem] font-bold tracking-widest">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(label, href); }}
              className={`relative pb-1 transition-colors ${
                active === label
                  ? "text-white after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:w-full after:h-[2px] after:bg-[#ea5959]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
          <a href="#" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
            <span>🇺🇸</span> EN
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#2d3848] border-t border-white/10 px-6 pb-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(label, href); }}
              className={`block py-3.5 text-sm font-bold tracking-widest border-b border-white/5 last:border-0 transition-colors ${
                active === label ? "text-[#ea5959]" : "text-gray-300 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
          <a href="#" className="flex items-center gap-2 py-3.5 text-sm font-bold text-gray-300 hover:text-white">
            <span>🇺🇸</span> ENGLISH SITE
          </a>
        </div>
      )}
    </nav>
  );
}
