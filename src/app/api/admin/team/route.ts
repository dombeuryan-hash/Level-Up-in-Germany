import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/team — returns all stored team member records
export async function GET() {
  const members = await prisma.teamMember.findMany();
  return NextResponse.json(members);
}

// POST /api/admin/team — upsert a team member by name
export async function POST(req: Request) {
  const body = await req.json();
  const { name, bioDe, bioEn, bioFr, linkedin, imageUrl } = body as {
    name: string;
    bioDe?: string;
    bioEn?: string;
    bioFr?: string;
    linkedin?: string;
    imageUrl?: string;
  };

  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }

  const member = await prisma.teamMember.upsert({
    where: { name },
    update: {
      bioDe: bioDe ?? '',
      bioEn: bioEn ?? '',
      bioFr: bioFr ?? '',
      linkedin: linkedin ?? '',
      imageUrl: imageUrl ?? '',
    },
    create: {
      name,
      bioDe: bioDe ?? '',
      bioEn: bioEn ?? '',
      bioFr: bioFr ?? '',
      linkedin: linkedin ?? '',
      imageUrl: imageUrl ?? '',
    },
  });

  return NextResponse.json(member);
}
