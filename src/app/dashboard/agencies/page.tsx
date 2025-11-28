import { Suspense } from 'react';
import { AgenciesTable } from '../../components/AgenciesTable';
import { Building2 } from 'lucide-react';
import { AgenciesTableSkeleton } from '../../components/AgenciesTableSkeleton';

export default function AgenciesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-400" />
            Agencies
          </h1>
          <p className="text-slate-400 mt-1">Browse and manage all agencies</p>
        </div>
      </div>

      {/* Table */}
      <Suspense fallback={<AgenciesTableSkeleton />}>
        <AgenciesTable />
      </Suspense>
    </div>
  );
}