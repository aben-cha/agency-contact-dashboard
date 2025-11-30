import { Skeleton } from '@/src/components/ui/skeleton';

export function AgenciesTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Filters Skeleton - Responsive */}
      <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Skeleton className="h-10 bg-slate-700 sm:col-span-2 lg:col-span-1" />
          <Skeleton className="h-10 bg-slate-700" />
        </div>
        
        {/* Results info skeleton */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <Skeleton className="h-4 w-48 bg-slate-700" />
          <Skeleton className="h-8 w-24 bg-slate-700" />
        </div>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 space-y-4">
          {/* Table header */}
          <div className="grid grid-cols-6 gap-4 pb-4 border-b border-slate-700">
            <Skeleton className="h-4 bg-slate-700" />
            <Skeleton className="h-4 bg-slate-700" />
            <Skeleton className="h-4 bg-slate-700" />
            <Skeleton className="h-4 bg-slate-700" />
            <Skeleton className="h-4 bg-slate-700" />
            <Skeleton className="h-4 bg-slate-700" />
          </div>
          
          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 items-center">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-lg bg-slate-700" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-slate-700" />
                  <Skeleton className="h-3 w-24 bg-slate-700" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 bg-slate-700" />
              <Skeleton className="h-6 w-16 bg-slate-700 rounded" />
              <Skeleton className="h-6 w-20 bg-slate-700 rounded-full" />
              <Skeleton className="h-6 w-16 bg-slate-700 rounded-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-lg bg-slate-700" />
                <Skeleton className="h-8 w-8 rounded-lg bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="lg:hidden space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <Skeleton className="h-9 w-9 rounded-lg bg-slate-700 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 bg-slate-700" />
                <Skeleton className="h-3 w-1/2 bg-slate-700" />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-slate-700" />
              <Skeleton className="h-4 w-2/3 bg-slate-700" />
              <Skeleton className="h-4 w-1/2 bg-slate-700" />
              
              {/* Contact buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Skeleton className="h-8 w-16 bg-slate-700" />
                <Skeleton className="h-8 w-20 bg-slate-700" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton - Responsive */}
      <div className="bg-slate-800 rounded-xl p-3 sm:p-4 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <Skeleton className="h-4 w-24 bg-slate-700" />
          <Skeleton className="h-9 w-16 sm:w-20 bg-slate-700" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 bg-slate-700" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 bg-slate-700 rounded" />
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 bg-slate-700 rounded" />
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 bg-slate-700 rounded" />
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}