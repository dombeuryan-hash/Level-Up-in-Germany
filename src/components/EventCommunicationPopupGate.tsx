'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { EventCommunicationPopup, type EventCommunicationPopupData } from '@/components/EventCommunicationPopup';

type Props = {
  locale: 'de' | 'en' | 'fr';
};

export function EventCommunicationPopupGate({ locale }: Props) {
  const pathname = usePathname();
  const [popup, setPopup] = useState<EventCommunicationPopupData & { popupDelaySeconds: number } | null>(null);
  const [open, setOpen] = useState(false);

  const isHomeHeroRoute = pathname === `/${locale}`;

  const storageKey = useMemo(() => {
    if (!popup) return null;
    return `eventCommunicationPopupClosed:${popup.eventId}:${popup.updatedAt ?? 'na'}`;
  }, [popup]);

  useEffect(() => {
    if (!isHomeHeroRoute) return;

    let cancelled = false;

    async function load() {
      const res = await fetch(`/api/communication/active?locale=${locale}`, {
        cache: 'no-store',
      });
      if (!res.ok || cancelled) return;

      const body = (await res.json()) as {
        popup: (EventCommunicationPopupData & { popupDelaySeconds: number }) | null;
      };

      if (!body.popup || cancelled) return;
      setPopup(body.popup);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [locale, isHomeHeroRoute]);

  useEffect(() => {
    if (!popup || !storageKey) return;
    if (window.sessionStorage.getItem(storageKey) === 'true') return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, popup.popupDelaySeconds * 1000);

    return () => window.clearTimeout(timer);
  }, [popup, storageKey]);

  function handleClose() {
    if (storageKey) {
      window.sessionStorage.setItem(storageKey, 'true');
    }
    setOpen(false);
  }

  if (!popup || !isHomeHeroRoute) return null;

  return <EventCommunicationPopup locale={locale} data={popup} open={open} display="hero" onClose={handleClose} />;
}