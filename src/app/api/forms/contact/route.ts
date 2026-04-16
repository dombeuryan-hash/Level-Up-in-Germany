import { NextRequest, NextResponse } from 'next/server';
import { sendContactMail } from '@/lib/resendService';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 });
  }

  try {
    await sendContactMail({ name, email, message });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Mailversand fehlgeschlagen.' }, { status: 500 });
  }
}
