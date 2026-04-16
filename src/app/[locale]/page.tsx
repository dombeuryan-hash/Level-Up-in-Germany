import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import { HomePageSections } from '@/components/HomePageSections';
import type { Locale } from '@/i18n/config';
import { homeContent } from '@/content/home';
import { getWhatsAppJoinUrl } from '@/config/whatsapp';
import { generateMetadataForPath } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return generateMetadataForPath(props.params, '');
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === 'de' || locale === 'en' || locale === 'fr' ? locale : 'en') as Locale;
  const t = homeContent[loc];
  const base = `/${loc}`;
  const joinWhatsAppUrl = getWhatsAppJoinUrl(loc);

  return (
    <>
      <HeroCarousel
        tagline={t.heroTagline}
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        stats={t.stats}
        primaryButton={{ label: t.heroBtnJoin, href: `${base}/contact` }}
        buttons={[
          { label: t.heroBtnAttend, href: `${base}/events` },
          { label: t.heroBtnPartner, href: `${base}/contact` },
        ]}
        autoplayInterval={6000}
      />
      <HomePageSections t={t} base={base} joinWhatsAppUrl={joinWhatsAppUrl} locale={loc} />
    </>
  );
}
