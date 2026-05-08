import React from "react";
import { useSite } from "../context/SiteContext";

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MemberCard({ member, index }) {
  const initials = member.name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "?";

  const position = member.pivot?.position ?? member.roles?.[0]?.name ?? null;

  const linkedin = member.socials?.find((s) =>
    s.platform?.toLowerCase().includes("linkedin")
  );
  const github = member.socials?.find((s) =>
    s.platform?.toLowerCase().includes("github")
  );

  const accentColors = [
    "from-[#ea5959] to-[#f07850]",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-purple-500 to-violet-600",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-600",
  ];
  const accent = accentColors[index % accentColors.length];

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Color band + avatar */}
      <div className={`h-2 w-full bg-gradient-to-r ${accent}`} />
      <div className="px-6 pt-7 pb-6 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-4">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-14 h-14 rounded-2xl object-cover shadow-md flex-shrink-0"
            />
          ) : (
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-white font-black text-xl shadow-md flex-shrink-0`}>
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-bold text-[#35404d] text-base leading-snug truncate">
              {member.name}
            </h3>
            {position && (
              <span className="inline-block mt-1 text-[0.6rem] font-bold tracking-widest uppercase text-[#ea5959] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                {position}
              </span>
            )}
          </div>
        </div>

        {member.bio && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
            {member.bio}
          </p>
        )}

        {(linkedin || github) && (
          <div className="flex gap-2 mt-auto">
            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#0077b5] hover:text-white text-gray-500 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            )}
            {github && (
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#333] hover:text-white text-gray-500 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Team() {
  const { team, company } = useSite() ?? {};

  if (!team?.length) return null;

  return (
    <section id="equipo" className="bg-[#f8f9fb] py-28 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#ea5959] text-xs font-bold tracking-widest uppercase mb-3">
            Quiénes somos
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#35404d] mb-4">
            Nuestro Equipo
          </h2>
          {company?.mission ? (
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              {company.mission}
            </p>
          ) : (
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              Un equipo íntegro de <strong className="text-[#35404d]">profesionales y expertos</strong> en diferentes disciplinas, listos para ejecutar tu proyecto de forma exitosa.
            </p>
          )}
        </div>

        {/* Member cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14">
          {team.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* CTA strip */}
        <div className="bg-gradient-to-r from-[#ea5959] to-[#f07850] rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <p className="text-white font-black text-xl md:text-2xl mb-1">
              ¿Tienes un proyecto en mente?
            </p>
            <p className="text-white/80 text-sm">
              Nuestro equipo está listo para ayudarte.
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="flex-shrink-0 bg-white text-[#ea5959] font-bold px-8 py-3.5 rounded-xl shadow hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm tracking-wide whitespace-nowrap"
          >
            Hablemos →
          </button>
        </div>
      </div>
    </section>
  );
}
