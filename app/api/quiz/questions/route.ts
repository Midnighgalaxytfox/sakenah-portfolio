import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await prisma.quizQuestion.findMany({
      orderBy: [{ category: 'asc' }, { subcategory: 'asc' }, { id: 'asc' }],
    });
    const questions = rows?.map?.((r) => ({
      id: r?.id,
      slug: r?.slug,
      category: r?.category,
      subcategory: r?.subcategory,
      difficulty: r?.difficulty,
      question: r?.question,
      options: Array.isArray(r?.options) ? (r?.options as string[]) : [],
      correctIndex: r?.correctIndex ?? 0,
      explanation: r?.explanation,
      wrongExplanations: (r?.wrongExplanations ?? {}) as Record<string, string>,
      xpReward: r?.xpReward ?? 10,
    })) ?? [];
    return NextResponse.json({ questions });
  } catch (e: any) {
    console.error('quiz questions GET failed', e);
    return NextResponse.json({ error: 'Failed to load questions' }, { status: 500 });
  }
}
