import { Skeleton } from '@/src/components/ui/skeleton';

export function ContactsTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Usage Stats Skeleton */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <Skeleton className="h-24 bg-slate-700" />
      </div>

      {/* Filters Skeleton */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-10 bg-slate-700" />
          <Skeleton className="h-10 bg-slate-700" />
          <Skeleton className="h-10 bg-slate-700" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 bg-slate-700" />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <Skeleton className="h-10 bg-slate-700" />
      </div>
    </div>
  );
}