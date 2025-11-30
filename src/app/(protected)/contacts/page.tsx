// "use client";

// import { Suspense } from 'react';
// import { ContactsTable } from '@/src/app/components/contacts/ContactsTable';
// import { Users } from 'lucide-react';
// import { ContactsTableSkeleton } from '@/src/app/components/contacts/ContactsTableSkeleton';

// export default function ContactsPage() {
  
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-white flex items-center gap-3">
//             <Users className="w-8 h-8 text-purple-400" />
//             Contacts
//           </h1>
//           <p className="text-slate-400 mt-1">Browse and manage all contacts</p>
//         </div>
//       </div>

//       {/* Table */}
//       <Suspense fallback={<ContactsTableSkeleton />}>
//         <ContactsTable />
//       </Suspense>
//     </div>
//   );
// }

"use client";

import { Suspense } from 'react';
import { ContactsTable } from '@/src/app/components/contacts/ContactsTable';
import { Users } from 'lucide-react';
import { ContactsTableSkeleton } from '@/src/app/components/contacts/ContactsTableSkeleton';

export default function ContactsPage() {
  return (
    <div className="space-y-4 sm:space-y-6 p-4 md:p-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 flex-shrink-0" />
            <span>Contacts</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Browse and manage all contacts
          </p>
        </div>
      </div>

      {/* Table */}
      <Suspense fallback={<ContactsTableSkeleton />}>
        <ContactsTable />
      </Suspense>
    </div>
  );
}