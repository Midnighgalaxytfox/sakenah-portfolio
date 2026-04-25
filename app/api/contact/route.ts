import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null as any);
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const subject = body?.subject ? String(body.subject).trim() : null;
    const message = String(body?.message ?? '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (name.length > 200 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('contact POST failed', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
