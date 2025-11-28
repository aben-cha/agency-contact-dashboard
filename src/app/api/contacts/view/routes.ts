import { auth } from '@clerk/nextjs/server';
import { prisma } from '@//src/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contactId } = await request.json();

    if (!contactId) {
      return NextResponse.json({ error: 'Contact ID required' }, { status: 400 });
    }

    // Check today's view count
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayViews = await prisma.contactView.count({
      where: {
        userId,
        viewedAt: {
          gte: todayStart,
        },
      },
    });

    // Check if limit reached
    if (todayViews >= 50) {
      return NextResponse.json(
        { error: 'Daily limit reached', limit: 50, current: todayViews },
        { status: 429 }
      );
    }

    // Record the view
    await prisma.contactView.create({
      data: {
        userId,
        contactId,
      },
    });

    return NextResponse.json({
      success: true,
      remaining: 50 - todayViews - 1,
    });
  } catch (error) {
    console.error('Error recording contact view:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}