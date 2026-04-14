import React from 'react';
import { Form } from '@/components/Form';
import type { Locale } from '@/i18n/config';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { SITE_CONTACT } from '@/config/siteContact';
import { generateMetadataForPath } from '@/lib/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  return generateMetadataForPath(props.params, '/contact');
}

const labels: Record<Locale, {
  eyebrow: string; title: string; intro: string;
  submitLabel: string; consentLabel: string; consentLinkText: string;
  sending: string; success: string; error: string;
  infoTitle: string;
  channels: { label: string; value: string; href?: string }[];
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
    channels: [
      { label: 'E-Mail', value: 'levelupingermany@gmail.com', href: 'mailto:levelupingermany@gmail.com' },
      { label: 'Telefon', value: '+49 152 04256840', href: 'tel:+4915204256840' },
      { label: 'Instagram', value: '@levelupingermany', href: 'https://instagram.com/levelupingermany' },
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
    channels: [
      { label: 'Email', value: 'levelupingermany@gmail.com', href: 'mailto:levelupingermany@gmail.com' },
      { label: 'Phone', value: '+49 152 04256840', href: 'tel:+4915204256840' },
      { label: 'Instagram', value: '@levelupingermany', href: 'https://instagram.com/levelupingermany' },
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
    channels: [
      { label: 'E-mail', value: 'levelupingermany@gmail.com', href: 'mailto:levelupingermany@gmail.com' },
      { label: 'Téléphone', value: '+49 152 04256840', href: 'tel:+4915204256840' },
      { label: 'Instagram', value: '@levelupingermany', href: 'https://instagram.com/levelupingermany' },
    ],
  },
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locale === 'de' || locale === 'en' || locale === 'fr' ? locale : 'en') as Locale;
  const t = labels[loc];
  const base = `/${loc}`;

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
            </RevealOnScroll>

            {/* Info */}
            <RevealOnScroll delayMs={100}>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-10 bg-accent" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{t.infoTitle}</p>
              </div>
              <div className="space-y-4">
                {t.channels.map((ch) => (
                  <div key={ch.label} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 transition hover:border-accent/30 hover:bg-accent/5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent/70 w-20 shrink-0">{ch.label}</span>
                    {ch.href ? (
                      <a href={ch.href} target={ch.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm font-medium text-brand-dark hover:text-primary transition-colors">
                        {ch.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-brand-dark">{ch.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Response time badge */}
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {loc === 'fr' ? 'Réponse sous 48h' : loc === 'de' ? 'Antwort innerhalb 48h' : 'Reply within 48h'}
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

    </div>
  );
}
