import React, { useState } from "react";
import { contactService } from "../api/services";

const contactInfo = [
  { label: "contacto@correo.com", icon: <svg className="w-4 h-4 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { label: "Chile · Remoto · Global", icon: <svg className="w-4 h-4 text-[#ea5959]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await contactService.send(form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError("No se pudo enviar el mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="w-full py-32 px-4" style={{ background: "linear-gradient(135deg, #1e2730 0%, #2d3848 100%)" }}>
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest text-[#ea5959] uppercase mb-3">¿Hablamos?</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">Trabajemos<br /><span className="text-[#ea5959]">juntos.</span></h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-sm">
            Cuéntanos tu proyecto o idea. Nuestro equipo está listo para ayudarte a hacerlo realidad.
          </p>
          <div className="space-y-4">
            {contactInfo.map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-3 text-gray-300">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">{icon}</div>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full">
          {sent ? (
            <div className="bg-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[320px]">
              <div className="text-5xl mb-4">✅</div>
              <h4 className="text-white font-bold text-xl mb-2">¡Mensaje enviado!</h4>
              <p className="text-gray-400">Te contactaremos a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-5">
              {error && <p className="text-red-400 text-sm">{error}</p>}
              {[{ key: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" }, { key: "email", label: "Email", type: "email", placeholder: "tu@email.com" }].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</label>
                  <input type={type} required value={form[key]} onChange={set(key)} placeholder={placeholder}
                    className="w-full bg-white/10 border border-white/15 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ea5959] transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Mensaje</label>
                <textarea required rows={4} value={form.message} onChange={set("message")} placeholder="Cuéntanos sobre tu proyecto..."
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ea5959] transition-colors resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#ea5959] hover:bg-[#d64a4a] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 tracking-widest text-sm">
                {loading ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
