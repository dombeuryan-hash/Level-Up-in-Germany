import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/home-buttons — public, returns active buttons ordered by displayOrder
export async function GET() {
  try {
    const buttons = await prisma.homeButton.findMany({
      where: { isActive: true },
      orderBy: [{ isPrimary: 'desc' }, { displayOrder: 'asc' }],
      select: {
        id: true,
        labelFr: true, labelDe: true, labelEn: true,
        linkType: true,
        linkTarget: true,
        colorVariant: true,
        isPrimary: true,
        openInNewTab: true,
        displayOrder: true,
      },
    });
    return NextResponse.json(buttons, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
