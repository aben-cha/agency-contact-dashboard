

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/src/app/lib/prisma';


export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ 
        error: 'Unauthorized' }, { 
        status: 401 
      });
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const state = searchParams.get('state')?.trim() || '';
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
        { county: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (state && state !== ' ') {
      where.state = state;
    }

    // Fetch data
    const [agencies, totalCount] = await Promise.all([
      prisma.agency.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          name: true,
          state: true,
          stateCode: true,
          type: true,
          population: true,
          totalSchools: true,
          totalStudents: true,
          phone: true,
          website: true,
          mailingAddress: true,
          county: true,
          _count: {
            select: { contacts: true },
          },
        },
      }),
      prisma.agency.count({ where }),
    ]);

    const serialized = agencies.map((agency) => ({
        ...agency,
        population: agency.population ? agency.population.toString() : null

    }));

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      data: serialized,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasMore: skip + serialized.length < totalCount,
      },
    });

  } catch (error) {
    console.error('Error fetching agencies:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch agencies',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}