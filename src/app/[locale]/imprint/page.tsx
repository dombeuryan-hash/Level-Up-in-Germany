import React from 'react';
import type { Locale } from '@/i18n/config';
import { generateMetadataForPath } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return generateMetadataForPath(props.params, '/imprint');
}

const content: Record<Locale, { title: string; body: string }> = {
  de: {
    title: 'Impressum',
    body:
      'LEVEL UP IN GERMANY e.V.\n[Straße und Hausnummer]\n[PLZ] [Stadt]\nDeutschland\n\nVertreten durch den Vorstand:\nFranck Ngami, Vorsitzender\n\nKontakt:\nE-Mail: levelupingermany@gmail.com\nTel.: +491520425684\n\nVereinsregister:\nEingetragen im Vereinsregister des Amtsgerichts [Stadt]\nVR [Nummer]\n\nUmsatzsteuer-Identifikationsnummer:\n[DE...]\n\nVerantwortlich für den Inhalt nach § 18 Abs. 2 MStV:\nFranck Ngami\n[Straße und Hausnummer]\n[PLZ] [Stadt]',
  },
  en: {
    title: 'Imprint',
    body:
      'LEVEL UP IN GERMANY e.V.\n[Street and number]\n[ZIP] [City]\nGermany\n\nRepresented by the board:\nFranck Ngami, Chairman\n\nContact:\nEmail: levelupingermany@gmail.com\nPhone: +491520425684\n\nAssociation register:\nRegistered in the association register of the local court [City]\nVR [number]\n\nVAT identification number:\n[DE...]\n\nResponsible for content pursuant to § 18 para. 2 MStV:\nFranck Ngami\n[Street and number]\n[ZIP] [City]',
  },
  fr: {
    title: 'Mentions légales',
    body:
      'LEVEL UP IN GERMANY e.V.\n[Rue et numéro]\n[Code postal] [Ville]\nAllemagne\n\nReprésenté par le bureau :\nFranck Ngami, Président\n\nContact :\nE-mail : levelupingermany@gmail.com\nTél. : +491520425684\n\nRegistre des associations :\nInscrit au registre des associations du tribunal de [Ville]\nVR [numéro]\n\nNuméro d\'identification TVA :\n[DE...]\n\nResponsable du contenu selon § 18 al. 2 MStV :\nFranck Ngami\n[Rue et numéro]\n[Code postal] [Ville]',
  },
};

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === 'de' || locale === 'en' || locale === 'fr' ? locale : 'de') as Locale;
  const t = content[loc];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-primary mb-6">{t.title}</h1>
      <p className="whitespace-pre-line text-gray-700">{t.body}</p>
    </div>
  );
}
