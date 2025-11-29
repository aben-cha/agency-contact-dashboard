import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/src/app/lib/prisma';

export async function GET(req: Request) {
  try {
    // Authentication check
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get today's view count for this user
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayViews = await prisma.contactView.count({
      where: {
        userId,
        viewedAt: { gte: todayStart },
      },
    });

    const hasReachedLimit = todayViews >= 50;
    const remainingViews = Math.max(0, 50 - todayViews);

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const state = searchParams.get('state')?.trim() || '';
    const sortBy = searchParams.get('sortBy') || 'firstName';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (state && state !== ' ') {
      where.agency = {
        state: state,
      };
    }

    // Fetch data
    const [contacts, totalCount] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          agency: {
            select: {
              name: true,
              state: true,
            },
          },
        },
      }),
      prisma.contact.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      data: contacts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasMore: skip + contacts.length < totalCount,
      },
      usage: {
        todayViews,
        remainingViews,
        hasReachedLimit,
        dailyLimit: 50,
      },
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch contacts',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}