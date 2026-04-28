import { NextRequest, NextResponse } from 'next/server';
import { getActiveCommunicationPopup } from '@/lib/event-communication';
import type { Locale } from '@/i18n/config';

function normalizeLocale(locale: string | null): Locale {
  return locale === 'de' || locale === 'fr' || locale === 'en' ? locale : 'fr';
}

export async function GET(req: NextRequest) {
  const locale = normalizeLocale(req.nextUrl.searchParams.get('locale'));
  const popup = await getActiveCommunicationPopup(locale);

  return NextResponse.json(
    {
      popup,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}