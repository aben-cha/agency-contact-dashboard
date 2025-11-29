import { auth } from '@clerk/nextjs/server';
import { prisma } from '@//src/app/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const state = searchParams.get('state') || '';
    const sortBy = searchParams.get('sortBy') || 'firstName';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (state) {
      where.state = state;
    }

    // Fetch contacts
    const [contacts, total] = await Promise.all([
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

    // Get usage stats for today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayViews = await prisma.contactView.count({
      where: {
        userId,
        viewedAt: { gte: todayStart },
      },
    });

    // Get which contacts the user has already viewed today
    const viewedContactIds = await prisma.contactView.findMany({
      where: {
        userId,
        viewedAt: { gte: todayStart },
      },
      select: {
        contactId: true,
      },
    });

    const dailyLimit = 50;
    const remainingViews = Math.max(0, dailyLimit - todayViews);

    return NextResponse.json({
      data: contacts,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
      usage: {
        todayViews,
        remainingViews,
        hasReachedLimit: todayViews >= dailyLimit,
        dailyLimit,
      },
      viewedContactIds: viewedContactIds.map(v => v.contactId), // Send list of viewed contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const { userId } = await auth();
//     console.log("userId: ", userId);
//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { contactId } = await request.json();

//     if (!contactId) {
//       return NextResponse.json({ error: 'Contact ID required' }, { status: 400 });
//     }

//     // Check today's view count
//     const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
//     const todayViews = await prisma.contactView.count({
//       where: {
//         userId,
//         viewedAt: {
//           gte: todayStart,
//         },
//       },
//     });

//     // Check if limit reached
//     if (todayViews >= 50) {
//       return NextResponse.json(
//         { error: 'Daily limit reached', limit: 50, current: todayViews },
//         { status: 429 }
//       );
//     }

//     // Record the view
//     await prisma.contactView.create({
//       data: {
//         userId,
//         contactId,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       remaining: 50 - todayViews - 1,
//     });
//   } catch (error) {
//     console.error('Error recording contact view:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

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
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayViews = await prisma.contactView.count({
      where: {
        userId,
        viewedAt: {
          gte: todayStart,
        },
      },
    });

    const dailyLimit = 50;

    // Check if limit reached
    if (todayViews >= dailyLimit) {
      return NextResponse.json(
        { 
          error: 'Daily limit reached', 
          usage: {
            todayViews,
            remainingViews: 0,
            hasReachedLimit: true,
            dailyLimit,
          }
        },
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

    const newTodayViews = todayViews + 1;

    return NextResponse.json({
      success: true,
      usage: {
        todayViews: newTodayViews,
        remainingViews: Math.max(0, dailyLimit - newTodayViews),
        hasReachedLimit: newTodayViews >= dailyLimit,
        dailyLimit,
      },
    });
  } catch (error) {
    console.error('Error recording contact view:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}