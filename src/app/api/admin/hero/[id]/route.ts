import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

function isAdmin() {
  const cookieStore = cookies();
  return cookieStore.get('admin_session')?.value === 'authenticated';
}

// PATCH /api/admin/hero/[id]
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  // If setting as main, unset all others first
  if (body.isMain) {
    await prisma.heroSlide.updateMany({ data: { isMain: false } });
  }

  const slide = await prisma.heroSlide.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(slide);
}

// DELETE /api/admin/hero/[id]
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.heroSlide.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
