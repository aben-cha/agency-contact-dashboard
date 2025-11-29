'use server';

import { cache } from 'react';
import prisma from '@/src/app/lib/prisma';

export interface DashboardStats {
  contactsCount: number;
  agenciesCount: number;
  viewsToday: number;
  viewsLimit: number;
  growth: number;
}

export const getDashboardStats = cache(async (userId: string): Promise<DashboardStats> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const [contactsCount, agenciesCount, viewsTodayCount, contactsLastMonth] =
    await Promise.all([
      prisma.contact.count(),
      prisma.agency.count(),
      prisma.contactView.count({
        where: {
          userId,
          viewedAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
      prisma.contact.count({
        where: {
          createdAt: {
            gte: lastMonth,
          },
        },
      }),
    ]);

  const previousTotal = contactsCount - contactsLastMonth;
  const growth =
    previousTotal > 0
      ? Math.round((contactsLastMonth / previousTotal) * 100)
      : 0;

  return {
    contactsCount,
    agenciesCount,
    viewsToday: viewsTodayCount,
    viewsLimit: 50,
    growth,
  };
});