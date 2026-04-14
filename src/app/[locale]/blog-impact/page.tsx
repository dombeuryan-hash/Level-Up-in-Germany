import React from 'react';
import type { Locale } from '@/i18n/config';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { generateMetadataForPath } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return generateMetadataForPath(props.params, '/blog-impact');
}

const content: Record<Locale, {
  eyebrow: string; title: string; intro: string;
  comingSoon: string; comingSoonBody: string;
  statsLabel: string;
  stats: { value: string; label: string }[];
  categories: string[];
}> = {
  de: {
    eyebrow: 'Stories & Wirkung',
    title: 'Blog & Impact',
    intro: 'Erfahrungen, Ressourcen und der messbare Einfluss unserer Community auf die Diaspora in Deutschland.',
    comingSoon: 'Bald verfügbar',
    comingSoonBody: 'Unsere ersten Artikel und Impact-Berichte sind in Vorbereitung. Folgen Sie uns, um als Erste informiert zu werden.',
    statsLabel: 'Unsere Wirkung bisher',
    stats: [
      { value: '300+', label: 'Teilnehmer:innen 2025' },
      { value: '10+', label: 'Partner & Sponsoren' },
      { value: '1', label: 'Mega Konferenz' },
    ],
    categories: ['Karriere', 'Studium', 'Unternehmertum', 'Integration', 'Events'],
  },
  en: {
    eyebrow: 'Stories & Impact',
    title: 'Blog & Impact',
    intro: 'Experiences, resources and the measurable influence of our community on the diaspora in Germany.',
    comingSoon: 'Coming soon',
    comingSoonBody: 'Our first articles and impact reports are being prepared. Follow us to be the first to know.',
    statsLabel: 'Our impact so far',
    stats: [
      { value: '300+', label: 'Attendees in 2025' },
      { value: '10+', label: 'Partners & Sponsors' },
      { value: '1', label: 'Mega Conference' },
    ],
    categories: ['Career', 'Studies', 'Entrepreneurship', 'Integration', 'Events'],
  },
  fr: {
    eyebrow: 'Récits & Impact',
    title: 'Blog & Impact',
    intro: 'Témoignages, ressources et l\'influence mesurable de notre communauté sur la diaspora en Allemagne.',
    comingSoon: 'Bientôt disponible',
    comingSoonBody: 'Nos premiers articles et rapports d\'impact sont en préparation. Suivez-nous pour être les premiers informés.',
    statsLabel: 'Notre impact jusqu\'ici',
    stats: [
      { value: '300+', label: 'Participants en 2025' },
      { value: '10+', label: 'Partenaires & Sponsors' },
      { value: '1', label: 'Méga Conférence' },
    ],
    categories: ['Carrière', 'Études', 'Entrepreneuriat', 'Intégration', 'Événements'],
  },
};

export default async function BlogImpactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale === 'de' || locale === 'en' || locale === 'fr' ? locale : 'en') as Locale;
  const t = content[loc];

  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#110808] via-[#1f0d0d] to-brand-dark" />
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_30%,rgba(233,140,11,0.22),transparent_50%)]" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_85%_80%,rgba(140,26,26,0.5),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)`, backgroundSize: '64px 64px' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 pt-24 sm:pt-28 w-full">
          <RevealOnScroll>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-accent mb-4">{t.eyebrow}</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white font-display leading-[1.02] max-w-3xl">{t.title}</h1>
            <p className="mt-5 text-base sm:text-lg text-white/65 max-w-xl leading-relaxed">{t.intro}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <RevealOnScroll>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-accent/80 mb-10">{t.statsLabel}</p>
          </RevealOnScroll>
          <div className="grid grid-cols-3 gap-6">
            {t.stats.map((s, i) => (
              <RevealOnScroll key={i} delayMs={i * 80}>
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-display font-bold text-white">{s.value}</p>
                  <p className="mt-2 text-sm text-white/60 uppercase tracking-wider">{s.label}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {t.categories.map((cat) => (
              <span key={cat} className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-accent/40 hover:text-accent cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON ── */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0806]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(233,140,11,0.12),transparent)]" />
        <span className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[12rem] sm:text-[18rem] font-black leading-none text-white/[0.02] tracking-tighter" aria-hidden>SOON</span>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-accent mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {t.comingSoon}
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white text-balance mb-6">
              {t.comingSoon}
            </h2>
            <p className="text-base sm:text-lg text-white/55 leading-relaxed">
              {t.comingSoonBody}
            </p>
          </RevealOnScroll>
        </div>
      </section>

    </div>
  );
}
