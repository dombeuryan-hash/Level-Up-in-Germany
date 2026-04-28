import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

function isAdmin() {
  const cookieStore = cookies();
  return cookieStore.get('admin_session')?.value === 'authenticated';
}

// GET /api/admin/buttons
export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const buttons = await prisma.homeButton.findMany({
    orderBy: { displayOrder: 'asc' },
  });
  return NextResponse.json(buttons);
}

// POST /api/admin/buttons
export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const {
    labelFr, labelDe, labelEn,
    linkType, linkTarget, colorVariant,
    displayOrder, isActive, isPrimary, openInNewTab,
  } = body;

  if (!labelFr || !labelEn || !labelDe || !linkTarget) {
    return NextResponse.json({ error: 'labelFr, labelDe, labelEn, linkTarget required' }, { status: 400 });
  }

  const button = await prisma.homeButton.create({
    data: {
      labelFr, labelDe, labelEn,
      linkType: linkType ?? 'internal',
      linkTarget,
      colorVariant: colorVariant ?? 'red',
      displayOrder: displayOrder ?? 0,
      isActive: isActive !== false,
      isPrimary: !!isPrimary,
      openInNewTab: !!openInNewTab,
    },
  });
  return NextResponse.json(button, { status: 201 });
}
