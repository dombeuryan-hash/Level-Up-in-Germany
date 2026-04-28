import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/hero — public, returns active hero slides ordered by sortOrder
export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: [{ isMain: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        imageUrl: true,
        isMain: true,
        titleFr: true, titleDe: true, titleEn: true,
        subtitleFr: true, subtitleDe: true, subtitleEn: true,
        altTextFr: true, altTextDe: true, altTextEn: true,
        linkType: true,
        linkTarget: true,
        sortOrder: true,
      },
    });
    return NextResponse.json(slides, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
