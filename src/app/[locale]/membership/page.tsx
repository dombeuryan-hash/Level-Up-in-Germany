import type { Locale } from '@/i18n/config';
import MembershipForm from '@/components/MembershipForm';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ locale: Locale }> };

const META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Devenir membre · Level Up in Germany',
    description:
      'Rejoignez Level Up in Germany en tant que membre officiel. Remplissez le formulaire d\'adhésion.',
  },
  en: {
    title: 'Become a member · Level Up in Germany',
    description:
      'Join Level Up in Germany as an official member. Fill in the membership application form.',
  },
  de: {
    title: 'Mitglied werden · Level Up in Germany',
    description:
      'Werden Sie offizielles Mitglied von Level Up in Germany. Füllen Sie das Beitrittsformular aus.',
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const m = META[locale] ?? META.en;
  return { title: m.title, description: m.description };
}

const HERO: Record<Locale, { heading: string; sub: string }> = {
  fr: {
    heading: 'Devenir membre',
    sub: 'Rejoignez notre association et contribuez à faire grandir Level Up in Germany.',
  },
  en: {
    heading: 'Become a member',
    sub: 'Join our association and help Level Up in Germany grow.',
  },
  de: {
    heading: 'Mitglied werden',
    sub: 'Treten Sie unserem Verein bei und helfen Sie Level Up in Germany zu wachsen.',
  },
};

export default async function MembershipPage({ params }: Props) {
  const { locale } = await params;
  const fallbackHero = HERO[locale] ?? HERO.en;
  let hero = fallbackHero;
  let heroBgUrl: string | null = null;

  try {
    const cfg = await prisma.siteConfig.findUnique({ where: { id: 'singleton' } });
    if (cfg) {
      const heading =
        locale === 'fr'
          ? cfg.membershipHeroHeadingFr
          : locale === 'de'
            ? cfg.membershipHeroHeadingDe
            : cfg.membershipHeroHeadingEn;

      const sub =
        locale === 'fr'
          ? cfg.membershipHeroSubFr
          : locale === 'de'
            ? cfg.membershipHeroSubDe
            : cfg.membershipHeroSubEn;

      hero = {
        heading: heading?.trim() || fallbackHero.heading,
        sub: sub?.trim() || fallbackHero.sub,
      };

      heroBgUrl = cfg.membershipHeroBgUrl?.trim() || null;
    }
  } catch {
    hero = fallbackHero;
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#110808] via-[#1a0a0a] to-[#0e0505] py-20 md:py-28">
        {heroBgUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: `url(${heroBgUrl})` }}
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#110808]/90 via-[#1a0a0a]/85 to-[#0e0505]/92" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-accent/60">
            Level Up in Germany
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {hero.heading}
          </h1>
          <p className="mt-4 text-base text-white/55 md:text-lg">{hero.sub}</p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-2xl px-6 py-16 md:py-20">
        <MembershipForm locale={locale} />
      </section>
    </main>
  );
}
