import { prisma } from '@/lib/prisma';
import type { Locale } from '@/i18n/config';

export const COMMUNICATION_DEFAULTS = {
  isCommunicationModeActive: false,
  popupDelaySeconds: 5,
  title: 'Something is coming...',
  description: 'Be among the first to receive updates about the next Level Up event.',
  buttonText: 'Join the list',
} as const;

export type CommunicationAdminEventOption = {
  id: string;
  year: number;
  slug: string;
  status: string;
  title: string;
  imageUrl: string | null;
};

export type CommunicationSettingsInput = {
  isCommunicationModeActive: boolean;
  popupDelaySeconds: number;
  title: string;
  description: string;
  buttonText: string;
  eventId: string | null;
};

export type ActiveCommunicationPopup = {
  id: string;
  eventId: string;
  popupDelaySeconds: number;
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string | null;
  eventTitle: string;
  eventYear: number;
  updatedAt: string;
};

function clampDelay(value: number) {
  if (!Number.isFinite(value)) return COMMUNICATION_DEFAULTS.popupDelaySeconds;
  return Math.max(0, Math.min(30, Math.round(value)));
}

function cleanText(value: unknown, fallback: string) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function pickEventTitle(
  translations: Array<{ locale: string; title: string }>,
  locale?: Locale,
) {
  if (locale) {
    const exact = translations.find((item) => item.locale === locale && item.title.trim());
    if (exact) return exact.title.trim();
  }
  return translations.find((item) => item.title.trim())?.title.trim() ?? 'Level Up Event';
}

function pickEventImage(event: {
  heroImageUrl: string | null;
  mediaItems: Array<{ url: string; isVisible: boolean }>;
}) {
  const firstVisibleMedia = event.mediaItems.find((item) => item.isVisible && item.url.trim());
  return firstVisibleMedia?.url ?? event.heroImageUrl ?? null;
}

export function normalizeCommunicationSettingsInput(payload: unknown): CommunicationSettingsInput {
  const raw = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {};

  return {
    isCommunicationModeActive: Boolean(raw.isCommunicationModeActive),
    popupDelaySeconds: clampDelay(Number(raw.popupDelaySeconds)),
    title: cleanText(raw.title, COMMUNICATION_DEFAULTS.title),
    description: cleanText(raw.description, COMMUNICATION_DEFAULTS.description),
    buttonText: cleanText(raw.buttonText, COMMUNICATION_DEFAULTS.buttonText),
    eventId: typeof raw.eventId === 'string' && raw.eventId.trim() ? raw.eventId.trim() : null,
  };
}

export async function getOrCreateCommunicationSettings() {
  const existing = await prisma.communicationSettings.findFirst({
    orderBy: { updatedAt: 'desc' },
  });

  if (existing) return existing;

  return prisma.communicationSettings.create({
    data: {
      ...COMMUNICATION_DEFAULTS,
    },
  });
}

export async function getCommunicationAdminData(locale: Locale) {
  const [settings, events] = await Promise.all([
    getOrCreateCommunicationSettings(),
    prisma.event.findMany({
      where: { deletedAt: null },
      orderBy: [{ year: 'desc' }, { sortOrder: 'asc' }],
      select: {
        id: true,
        year: true,
        slug: true,
        status: true,
        heroImageUrl: true,
        translations: {
          select: {
            locale: true,
            title: true,
          },
        },
        mediaItems: {
          where: { isVisible: true },
          orderBy: { sortOrder: 'asc' },
          select: {
            url: true,
            isVisible: true,
          },
        },
      },
    }),
  ]);

  const eventOptions: CommunicationAdminEventOption[] = events.map((event) => ({
    id: event.id,
    year: event.year,
    slug: event.slug,
    status: event.status,
    title: pickEventTitle(event.translations, locale),
    imageUrl: pickEventImage(event),
  }));

  return {
    settings: {
      id: settings.id,
      isCommunicationModeActive: settings.isCommunicationModeActive,
      popupDelaySeconds: settings.popupDelaySeconds,
      title: settings.title,
      description: settings.description,
      buttonText: settings.buttonText,
      eventId: settings.eventId,
      updatedAt: settings.updatedAt.toISOString(),
    },
    events: eventOptions,
  };
}

export async function saveCommunicationSettings(input: CommunicationSettingsInput) {
  const current = await getOrCreateCommunicationSettings();

  if (input.eventId) {
    const eventExists = await prisma.event.findUnique({
      where: { id: input.eventId },
      select: { id: true },
    });
    if (!eventExists) {
      throw new Error('event_not_found');
    }
  }

  return prisma.communicationSettings.update({
    where: { id: current.id },
    data: {
      isCommunicationModeActive: input.isCommunicationModeActive,
      popupDelaySeconds: input.popupDelaySeconds,
      title: input.title,
      description: input.description,
      buttonText: input.buttonText,
      eventId: input.eventId,
    },
  });
}

export async function getActiveCommunicationPopup(locale: Locale): Promise<ActiveCommunicationPopup | null> {
  const settings = await prisma.communicationSettings.findFirst({
    where: { isCommunicationModeActive: true, eventId: { not: null } },
    orderBy: { updatedAt: 'desc' },
    include: {
      event: {
        select: {
          id: true,
          year: true,
          slug: true,
          heroImageUrl: true,
          translations: {
            select: {
              locale: true,
              title: true,
            },
          },
          mediaItems: {
            where: { isVisible: true },
            orderBy: { sortOrder: 'asc' },
            select: {
              url: true,
              isVisible: true,
            },
          },
        },
      },
    },
  });

  if (!settings?.event) return null;

  return {
    id: settings.id,
    eventId: settings.event.id,
    popupDelaySeconds: settings.popupDelaySeconds,
    title: settings.title,
    description: settings.description,
    buttonText: settings.buttonText,
    imageUrl: pickEventImage(settings.event),
    eventTitle: pickEventTitle(settings.event.translations, locale),
    eventYear: settings.event.year,
    updatedAt: settings.updatedAt.toISOString(),
  };
}