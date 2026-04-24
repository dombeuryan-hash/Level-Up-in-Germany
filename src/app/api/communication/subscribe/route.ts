import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function cleanFirstName(value: unknown) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed || null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      eventId?: string;
      email?: string;
      firstName?: string;
    };

    const eventId = typeof body.eventId === 'string' ? body.eventId.trim() : '';
    const email = normalizeEmail(body.email ?? '');
    const firstName = cleanFirstName(body.firstName);

    if (!eventId) {
      return NextResponse.json({ ok: false, error: 'missing_event' }, { status: 400 });
    }

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, year: true },
    });

    if (!event) {
      return NextResponse.json({ ok: false, error: 'event_not_found' }, { status: 404 });
    }

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        firstName: firstName ?? undefined,
        consent: true,
        source: `event_communication_${event.year}`,
        tags: `levelup_event,event_${event.year},communication_popup`,
      },
      create: {
        email,
        firstName,
        consent: true,
        source: `event_communication_${event.year}`,
        tags: `levelup_event,event_${event.year},communication_popup`,
      },
    });

    await prisma.eventCommunicationLead.upsert({
      where: {
        eventId_email: {
          eventId,
          email,
        },
      },
      update: {
        firstName: firstName ?? undefined,
        subscriberId: subscriber.id,
      },
      create: {
        eventId,
        email,
        firstName,
        subscriberId: subscriber.id,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[communication-subscribe]', error);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}