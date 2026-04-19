import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';

// GET /api/admin/media?category=blog
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const media = await prisma.media.findMany({
    where: category && category !== 'all' ? { category } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(media);
}

// DELETE /api/admin/media?id=xxx
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id requis' }, { status: 400 });
  }

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) {
    return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 });
  }

  // Delete file from disk (only for /media/ uploads, not external URLs)
  if (media.url.startsWith('/media/')) {
    const filePath = join(process.cwd(), 'public', media.url);
    await unlink(filePath).catch(() => {/* ignore if already gone */});
  }

  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
