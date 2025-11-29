"use client";

import { Suspense } from 'react';
import { ContactsTable } from '@/src/app/components/contacts/ContactsTable';
import { Users } from 'lucide-react';
import { ContactsTableSkeleton } from '@/src/app/components/contacts/ContactsTableSkeleton';

export default function ContactsPage() {
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            Contacts
          </h1>
          <p className="text-slate-400 mt-1">Browse and manage all contacts</p>
        </div>
      </div>

      {/* Table */}
      <Suspense fallback={<ContactsTableSkeleton />}>
        <ContactsTable />
      </Suspense>
    </div>
  );
}