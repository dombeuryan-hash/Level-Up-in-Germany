'use client';

import React, { useState, useEffect } from 'react';
import type { Locale } from '@/i18n/config';
import type { CoreTeamMember } from '@/content/core-team';

type Props = {
  members: CoreTeamMember[];
  locale: Locale;
};

const closeCopy: Record<Locale, string> = {
  de: 'Schließen',
  en: 'Close',
  fr: 'Fermer',
};

const bioPlaceholder: Record<Locale, string> = {
  de: 'Biografie folgt in Kürze.',
  en: 'Biography coming soon.',
  fr: 'Biographie à venir.',
};

export function CoreTeamGrid({ members, locale }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const active = selected !== null ? members[selected] : null;

  return (
    <section aria-label="Team">
      {/* Grid */}
      <ul className="list-none p-0 m-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {members.map((m, i) => (
          <li key={`${m.image}-${i}`}>
            <button
              type="button"
              onClick={() => setSelected(selected === i ? null : i)}
              aria-expanded={selected === i}
              className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
            >
              <article
                className={`relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 ${
                  selected === i
                    ? 'ring-2 ring-accent shadow-2xl shadow-accent/20 scale-[1.02]'
                    : 'ring-1 ring-white/10 hover:ring-accent/50 hover:scale-[1.01]'
                }`}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-900">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top accent bar */}
                  <div
                    className={`absolute top-0 left-0 h-[3px] bg-gradient-to-r from-accent to-primary transition-all duration-500 ${
                      selected === i ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />

                  {/* Name + role */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 sm:px-4 sm:pb-4">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-accent leading-none mb-1">
                      {m.role[locale]}
                    </p>
                    <h3 className="text-sm sm:text-[0.95rem] font-bold text-white leading-tight font-display">
                      {m.name}
                    </h3>
                  </div>

                  {/* Click hint */}
                  <div
                    className={`absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      selected === i
                        ? 'bg-accent text-white rotate-45'
                        : 'bg-white/20 text-white group-hover:bg-white/30'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </article>
            </button>
          </li>
        ))}
      </ul>

      {/* Expanded panel — MBOA style */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          active ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
        }`}
        aria-live="polite"
      >
        {active && (
          <div className="relative rounded-2xl bg-white overflow-hidden shadow-2xl">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-primary to-accent" />

            <div className="flex flex-col sm:flex-row gap-0">
              {/* Photo — left */}
              <div className="relative w-full sm:w-[280px] md:w-[320px] shrink-0 aspect-[4/5] sm:aspect-auto sm:min-h-[380px]">
                <img
                  src={active.image}
                  alt={active.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>

              {/* Content — right */}
              <div className="flex-1 px-6 py-8 sm:px-8 sm:py-10 md:px-10">
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors"
                  aria-label={closeCopy[locale]}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {closeCopy[locale]}
                </button>

                {/* Name */}
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark font-display leading-tight">
                  {active.name}
                </h2>

                {/* Role */}
                <p className="mt-1 text-sm font-medium text-primary">
                  {active.role[locale]}
                </p>

                {/* Red divider — MBOA signature */}
                <div className="mt-3 mb-5 h-[3px] w-12 bg-primary rounded-full" />

                {/* Bio */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed italic">
                  {('bio' in active && (active as { bio?: Record<Locale, string> }).bio?.[locale]) || bioPlaceholder[locale]}
                </p>

                {/* Social links — placeholder until filled */}
                {'linkedin' in active && (active as { linkedin?: string }).linkedin && (
                  <a
                    href={(active as { linkedin?: string }).linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary border border-primary/30 rounded-full px-4 py-2 hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
