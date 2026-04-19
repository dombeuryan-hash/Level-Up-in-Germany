import { prisma } from '@/lib/prisma';
import { TeamMembersEditor } from './TeamMembersEditor';

export default async function AdminTeamPage() {
  let dbMembers: {
    name: string;
    bioDe: string;
    bioEn: string;
    bioFr: string;
    linkedin: string;
    imageUrl: string;
  }[] = [];

  try {
    const rows = await prisma.teamMember.findMany();
    dbMembers = rows.map((r) => ({
      name: r.name,
      bioDe: r.bioDe ?? '',
      bioEn: r.bioEn ?? '',
      bioFr: r.bioFr ?? '',
      linkedin: r.linkedin ?? '',
      imageUrl: r.imageUrl ?? '',
    }));
  } catch {
    // DB not yet migrated — start with empty state
  }

  return <TeamMembersEditor initialData={dbMembers} />;
}
