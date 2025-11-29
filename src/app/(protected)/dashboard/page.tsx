import { Users, Building2, TrendingUp, Eye } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

import {getDashboardStats} from "@/src/app/lib/queries/dashboard";

export default async function DashboardPage() {
 const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400">Please sign in to view dashboard</p>
      </div>
    );
  }

  const stats = await getDashboardStats(userId);
  const isNearLimit = (stats.viewsToday / stats.viewsLimit) * 100 >= 80;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back! Here&apos;s your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Contacts */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Contacts</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.contactsCount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Total Agencies */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Agencies</p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.agenciesCount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-lg">
              <Building2 className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Views Today */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Views Today</p>
              <p
                className={`text-3xl font-bold mt-2 ${
                  isNearLimit ? 'text-orange-400' : 'text-white'
                }`}
              >
                {stats.viewsToday} / {stats.viewsLimit}
              </p>
              {isNearLimit && (
                <p className="text-xs text-orange-400 mt-1">
                  Approaching limit
                </p>
              )}
            </div>
            <div
              className={`p-3 rounded-lg ${
                isNearLimit ? 'bg-orange-500/10' : 'bg-cyan-500/10'
              }`}
            >
              <Eye
                className={`w-6 h-6 ${
                  isNearLimit ? 'text-orange-400' : 'text-cyan-400'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Growth */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Growth</p>
              <p className="text-3xl font-bold text-white mt-2">+23%</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/contacts"
            className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors border border-slate-600"
          >
            <Users className="w-5 h-5 text-purple-400 mb-2" />
            <h3 className="font-semibold text-white">Browse Contacts</h3>
            <p className="text-sm text-slate-400 mt-1">View all contacts</p>
          </Link>

          <Link
            href="/agencies"
            className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors border border-slate-600"
          >
            <Building2 className="w-5 h-5 text-indigo-400 mb-2" />
            <h3 className="font-semibold text-white">View Agencies</h3>
            <p className="text-sm text-slate-400 mt-1">Explore agencies</p>
          </Link>

          <Link
            href="/contacts"
            className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors border border-slate-600"
          >
            <Eye className="w-5 h-5 text-cyan-400 mb-2" />
            <h3 className="font-semibold text-white">Recent Views</h3>
            <p className="text-sm text-slate-400 mt-1">See your activity</p>
          </Link>
        </div>
      </div>
    </div>
  );
}