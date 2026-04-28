import React from 'react';
import { Form } from '@/components/Form';
import type { Locale } from '@/i18n/config';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { SOCIAL_LINKS } from '@/data/social';
import { getWhatsAppJoinUrl } from '@/config/whatsapp';
import { SITE_CONTACT } from '@/config/siteContact';
import { generateMetadataForPath } from '@/lib/seo';

type ChannelTone = 'neutral' | 'linkedin' | 'instagram' | 'tiktok' | 'whatsapp';
type ChannelIconKey = 'email' | 'phone' | 'whatsapp' | 'linkedin' | 'instagram' | 'tiktok';

function ChannelIcon({ icon, className }: { icon: ChannelIconKey; className?: string }) {
  if (icon === 'email') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16v12H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  if (icon === 'phone') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.28a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }
  if (icon === 'whatsapp') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.16 1.6 5.98L0 24l6.3-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.47-8.43Zm-8.45 18.33h-.01a9.93 9.93 0 0 1-5.06-1.39l-.36-.21-3.74.98 1-3.64-.23-.38a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.41c-.3-.15-1.77-.88-2.04-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.24-.46-2.37-1.48-.87-.77-1.46-1.72-1.63-2.01-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.01-1.04 2.46s1.07 2.86 1.22 3.05c.15.2 2.1 3.2 5.09 4.48.71.31 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.42-.08-.12-.27-.2-.57-.35Z" />
      </svg>
    );
  }
  if (icon === 'linkedin') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (icon === 'instagram') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return generateMetadataForPath(props.params, '/contact');
}

const labels: Record<Locale, {
  eyebrow: string; title: string; intro: string;
  submitLabel: string; consentLabel: string; consentLinkText: string;
  sending: string; success: string; error: string;
  infoTitle: string;
  infoLead: string;
  channels: { label: string; value: string; href?: string; icon: ChannelIconKey; tone: ChannelTone }[];
  socialTitle: string;
  socialLead: string;
}> = {
  de: {
    eyebrow: 'Schreiben Sie uns',
    title: 'Kontakt',
    intro: 'Eine Frage, eine Idee, eine Partnerschaft? Wir freuen uns von Ihnen zu hören.',
    submitLabel: 'Nachricht senden',
    consentLabel: 'Ich stimme der Verarbeitung meiner Daten gemäß der',
    consentLinkText: 'Datenschutzerklärung',
    sending: 'Wird gesendet…',
    success: 'Nachricht gesendet. Wir melden uns bald.',
    error: 'Senden fehlgeschlagen. Bitte erneut versuchen.',
    infoTitle: 'Direkte Kontaktmöglichkeiten',
    infoLead: 'Wählen Sie den Kanal, der für Sie am schnellsten und passendsten ist. Alle Links öffnen direkt den richtigen Kontaktweg.',
    socialTitle: 'Community & Netzwerke',
    socialLead: 'Schnellster Weg in die Community: WhatsApp. Für Updates und Einblicke finden Sie uns auch auf LinkedIn, Instagram und TikTok.',
    channels: [
      { label: 'E-Mail', value: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}`, icon: 'email', tone: 'neutral' },
      { label: 'Telefon', value: '+49 152 04256840', href: 'tel:+4915204256840', icon: 'phone', tone: 'neutral' },
      { label: 'WhatsApp', value: 'Community beitreten', icon: 'whatsapp', tone: 'whatsapp' },
      { label: 'LinkedIn', value: 'Level Up in Germany', href: SOCIAL_LINKS.linkedin, icon: 'linkedin', tone: 'linkedin' },
      { label: 'Instagram', value: '@level_up_in_germany', href: SOCIAL_LINKS.instagram, icon: 'instagram', tone: 'instagram' },
      { label: 'TikTok', value: '@levelupingermany', href: SOCIAL_LINKS.tiktok, icon: 'tiktok', tone: 'tiktok' },
    ],
  },
  en: {
    eyebrow: 'Get in touch',
    title: 'Contact',
    intro: 'A question, an idea, a partnership? We would love to hear from you.',
    submitLabel: 'Send message',
    consentLabel: 'I agree to the processing of my data according to the',
    consentLinkText: 'Privacy Policy',
    sending: 'Sending…',
    success: 'Message sent. We will get back to you soon.',
    error: 'Submission failed. Please try again.',
    infoTitle: 'Direct contact',
    infoLead: 'Choose the channel that fits best. Every link takes you straight to the right contact point.',
    socialTitle: 'Community & social channels',
    socialLead: 'The fastest way into the community is WhatsApp. For updates and stories, find us on LinkedIn, Instagram and TikTok too.',
    channels: [
      { label: 'Email', value: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}`, icon: 'email', tone: 'neutral' },
      { label: 'Phone', value: '+49 152 04256840', href: 'tel:+4915204256840', icon: 'phone', tone: 'neutral' },
      { label: 'WhatsApp', value: 'Join the community', icon: 'whatsapp', tone: 'whatsapp' },
      { label: 'LinkedIn', value: 'Level Up in Germany', href: SOCIAL_LINKS.linkedin, icon: 'linkedin', tone: 'linkedin' },
      { label: 'Instagram', value: '@level_up_in_germany', href: SOCIAL_LINKS.instagram, icon: 'instagram', tone: 'instagram' },
      { label: 'TikTok', value: '@levelupingermany', href: SOCIAL_LINKS.tiktok, icon: 'tiktok', tone: 'tiktok' },
    ],
  },
  fr: {
    eyebrow: 'Écrivez-nous',
    title: 'Contact',
    intro: 'Une question, une idée, un partenariat ? Nous serions ravis d\'avoir de vos nouvelles.',
    submitLabel: 'Envoyer le message',
    consentLabel: 'J\'accepte le traitement de mes données selon la',
    consentLinkText: 'Politique de confidentialité',
    sending: 'Envoi en cours…',
    success: 'Message envoyé. Nous vous répondrons bientôt.',
    error: 'L\'envoi a échoué. Réessayez.',
    infoTitle: 'Contact direct',
    infoLead: 'Choisissez le canal le plus adapté. Chaque lien vous mène directement au bon point de contact.',
    socialTitle: 'Communauté & réseaux',
    socialLead: 'Le moyen le plus rapide d’entrer dans la communauté est WhatsApp. Pour les actualités et coulisses, retrouvez-nous aussi sur LinkedIn, Instagram et TikTok.',
    channels: [
      { label: 'E-mail', value: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}`, icon: 'email', tone: 'neutral' },
      { label: 'Téléphone', value: '+49 152 04256840', href: 'tel:+4915204256840', icon: 'phone', tone: 'neutral' },
      { label: 'WhatsApp', value: 'Rejoindre la communauté', icon: 'whatsapp', tone: 'whatsapp' },
      { label: 'LinkedIn', value: 'Level Up in Germany', href: SOCIAL_LINKS.linkedin, icon: 'linkedin', tone: 'linkedin' },
      { label: 'Instagram', value: '@level_up_in_germany', href: SOCIAL_LINKS.instagram, icon: 'instagram', tone: 'instagram' },
      { label: 'TikTok', value: '@levelupingermany', href: SOCIAL_LINKS.tiktok, icon: 'tiktok', tone: 'tiktok' },
    ],
  },
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale === 'de' || locale === 'en' || locale === 'fr' ? locale : 'en') as Locale;
  const t = labels[loc];
  const base = `/${loc}`;
  const whatsAppHref = getWhatsAppJoinUrl(loc);

  const toneClass: Record<ChannelTone, string> = {
    neutral: 'border-gray-100 bg-gray-50 text-brand-dark hover:border-accent/30 hover:bg-accent/5',
    linkedin: 'border-[#D8E5FF] bg-[#F3F7FF] text-[#0A66C2] hover:border-[#0A66C2]/35 hover:bg-[#E9F1FF]',
    instagram: 'border-[#F7D7E7] bg-[linear-gradient(135deg,rgba(255,244,248,1),rgba(255,247,235,1))] text-[#C13584] hover:border-[#C13584]/35 hover:bg-[linear-gradient(135deg,rgba(255,238,244,1),rgba(255,241,226,1))]',
    tiktok: 'border-[#DDE9E7] bg-[#F3FAF9] text-[#0F172A] hover:border-[#111827]/20 hover:bg-[#EDF7F5]',
    whatsapp: 'border-[#CFEFDC] bg-[#F2FCF6] text-[#128C4A] hover:border-[#128C4A]/35 hover:bg-[#E8FAEF]',
  };

  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[48vh] flex items-end overflow-hidden">
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

      {/* ── FORM + INFO ── */}
      <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
        <div className="absolute left-0 top-16 bottom-16 w-1 bg-gradient-to-b from-transparent via-accent to-transparent rounded-full" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">

            {/* Form */}
            <RevealOnScroll>
              <div className="rounded-[2rem] border border-brand-dark/8 bg-white p-6 shadow-[0_28px_80px_rgba(16,24,40,0.08)] sm:p-8">
                <div className="mb-6 flex items-center gap-3 text-left">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                    <ChannelIcon icon="email" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-accent/80">{t.infoTitle}</p>
                    <p className="mt-1 text-sm text-gray-500">{t.infoLead}</p>
                  </div>
                </div>
                <Form
                  locale={loc}
                  formType="contact"
                  fields={[
                    { name: 'name', type: 'text', label: 'Name', required: true },
                    { name: 'email', type: 'email', label: 'E-Mail', required: true },
                    { name: 'message', type: 'textarea', label: loc === 'de' ? 'Nachricht' : 'Message', required: true },
                  ]}
                  submitLabel={t.submitLabel}
                  consentLabel={t.consentLabel}
                  consentLinkHref={`${base}/privacy`}
                  consentLinkText={t.consentLinkText}
                  sendingLabel={t.sending}
                  successMessage={t.success}
                  errorMessage={t.error}
                />
              </div>
            </RevealOnScroll>

            {/* Info */}
            <RevealOnScroll delayMs={100}>
              <div className="md:sticky md:top-28 text-left">
                <div className="flex items-center gap-4 mb-4 justify-start">
                  <div className="h-px w-10 bg-accent" />
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{t.infoTitle}</p>
                </div>
                <p className="mb-6 max-w-xl text-sm leading-7 text-gray-500">{t.infoLead}</p>
                <div className="mb-6 overflow-hidden rounded-[2rem] border border-brand-dark/8 bg-[linear-gradient(160deg,#151515_0%,#22100d_54%,#2C130D_100%)] px-6 py-7 text-white shadow-[0_28px_80px_rgba(16,24,40,0.16)]">
                  <div className="pointer-events-none absolute" />
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-accent/90">{t.socialTitle}</p>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/72">{t.socialLead}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {t.channels.map((ch) => {
                  const href = ch.label === 'WhatsApp' ? whatsAppHref : ch.href;
                  return (
                    <a
                      key={ch.label}
                      href={href}
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`group flex items-center justify-start gap-4 rounded-[1.35rem] border px-5 py-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition ${toneClass[ch.tone]}`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 shadow-sm ring-1 ring-black/5">
                        <ChannelIcon icon={ch.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-current/70">{ch.label}</span>
                        <span className="mt-1 block text-sm font-semibold text-current">{ch.value}</span>
                      </span>
                      <span className="text-lg text-current/45 transition group-hover:translate-x-0.5 group-hover:text-current">↗</span>
                    </a>
                  );
                })}
                </div>

                <div className="mt-8 flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {loc === 'fr' ? 'Réponse sous 48h' : loc === 'de' ? 'Antwort innerhalb 48h' : 'Reply within 48h'}
                  </div>
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

    </div>
  );
}
