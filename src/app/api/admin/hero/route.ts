import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

function isAdmin() {
  const cookieStore = cookies();
  return cookieStore.get('admin_session')?.value === process.env.ADMIN_SECRET;
}

// GET /api/admin/hero — list all slides
export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slides = await prisma.heroSlide.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
  return NextResponse.json(slides);
}

// POST /api/admin/hero — create a slide
export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const {
    imageUrl, isMain, titleFr, titleDe, titleEn,
    subtitleFr, subtitleDe, subtitleEn,
    altTextFr, altTextDe, altTextEn,
    linkType, linkTarget, isActive, sortOrder,
  } = body;

  if (!imageUrl) return NextResponse.json({ error: 'imageUrl required' }, { status: 400 });

  // If setting as main, unset all others
  if (isMain) {
    await prisma.heroSlide.updateMany({ data: { isMain: false } });
  }

  const slide = await prisma.heroSlide.create({
    data: {
      imageUrl,
      isMain: !!isMain,
      titleFr, titleDe, titleEn,
      subtitleFr, subtitleDe, subtitleEn,
      altTextFr, altTextDe, altTextEn,
      linkType, linkTarget,
      isActive: isActive !== false,
      sortOrder: sortOrder ?? 0,
    },
  });
  return NextResponse.json(slide, { status: 201 });
}
