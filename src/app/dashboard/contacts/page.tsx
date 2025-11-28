import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/src/app/lib/prisma';
import { Users, AlertCircle } from 'lucide-react';
import { ContactCard } from '../../components/ContactCard';
import { UpgradeModal } from '../../components/UpgradeModal';

async function getContactsWithLimit(userId: string) {
  // Get today's view count
  const todayViews = await prisma.contactView.count({
    where: {
      userId,
      viewedAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  const hasReachedLimit = todayViews >= 50;
  const remainingViews = Math.max(0, 50 - todayViews);

  // Get contacts
  const contacts = await prisma.contact.findMany({
    take: 100,
    orderBy: { firstName: 'asc' },
    include: {
      agency: {
        select: {
          name: true,
          state: true,
        },
      },
    },
  });

  return { contacts, todayViews, hasReachedLimit, remainingViews };
}

export default async function ContactsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const { contacts, todayViews, hasReachedLimit, remainingViews } = await getContactsWithLimit(userId);

  return (
    <div className="space-y-6">
      {/* Header with Usage Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            Contacts
          </h1>
          <p className="text-slate-400 mt-1">View contact information (50 per day limit)</p>
        </div>
        <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{todayViews} / 50</div>
            <div className="text-xs text-slate-400 mt-1">Views today</div>
          </div>
        </div>
      </div>

      {/* Usage Bar */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">Daily Usage</span>
          <span className="text-sm font-medium text-slate-300">{remainingViews} remaining</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              hasReachedLimit ? 'bg-red-500' : todayViews >= 40 ? 'bg-orange-500' : 'bg-purple-500'
            }`}
            style={{ width: `${(todayViews / 50) * 100}%` }}
          />
        </div>
      </div>

      {/* Limit Warning */}
      {hasReachedLimit && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-400 font-semibold">Daily Limit Reached</h3>
            <p className="text-red-300/80 text-sm mt-1">
              You've reached your daily limit of 50 contact views. Upgrade your account to view unlimited contacts.
            </p>
            <UpgradeModal />
          </div>
        </div>
      )}

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {contacts.map((contact, index) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            userId={userId}
            isBlurred={hasReachedLimit}
            index={index}
          />
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400">No contacts found</h3>
        </div>
      )}
    </div>
  );
}