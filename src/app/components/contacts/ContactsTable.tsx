'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Users,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Eye,
  AlertCircle,
  Crown
} from 'lucide-react';
import { UpgradeModal } from '@/src/app/components/UpgradeModal';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  title: string | null;
  department: string | null;
  agency: {
    name: string;
    state: string | null;
  } | null;
}

interface UsageInfo {
  todayViews: number;
  remainingViews: number;
  hasReachedLimit: boolean;
  dailyLimit: number;
}

export function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<UsageInfo>({
    todayViews: 0,
    remainingViews: 50,
    hasReachedLimit: false,
    dailyLimit: 50,
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Revealed contacts (tracked locally)
  const [revealedContacts, setRevealedContacts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(state && { state }),
          sortBy,
          sortOrder,
        });

        const response = await fetch(`/api/contacts?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          console.error('API Error:', data.error);
          return;
        }

        setContacts(data.data || []);
        setTotalCount(data.pagination?.total || 0);
        setTotalPages(data.pagination?.totalPages || 0);
        
        // Update usage with proper data from server
        if (data.usage) {
          setUsage({
            todayViews: data.usage.todayViews,
            remainingViews: data.usage.remainingViews,
            hasReachedLimit: data.usage.hasReachedLimit,
            dailyLimit: data.usage.dailyLimit,
          });
        }

        // Set revealed contacts from server data
        if (data.viewedContactIds) {
          setRevealedContacts(new Set(data.viewedContactIds));
        }
        
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [page, limit, debouncedSearch, state, sortBy, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(parseInt(newLimit));
    setPage(1);
  };

  // const handleRevealContact = async (contactId: string) => {
  //   if (usage.hasReachedLimit || revealedContacts.has(contactId)) return;

  //   try {
  //     const response = await fetch('/api/contacts/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ contactId }),
  //     });

  //     if (response.ok) {
  //       setRevealedContacts(prev => new Set(prev).add(contactId));
  //       // Update usage
  //       setUsage(prev => ({
  //         ...prev,
  //         todayViews: prev.todayViews + 1,
  //         remainingViews: Math.max(0, prev.remainingViews - 1),
  //         hasReachedLimit: prev.todayViews + 1 >= prev.dailyLimit,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error('Error recording view:', error);
  //   }
  // };

  const handleRevealContact = async (contactId: string) => {
    if (usage.hasReachedLimit || revealedContacts.has(contactId)) return;

    try {
      const response = await fetch('/api/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId }),
      });

      const data = await response.json();

      if (response.ok) {
        setRevealedContacts(prev => new Set(prev).add(contactId));
        // Use the usage data returned from the server
        if (data.usage) {
          setUsage(data.usage);
        }
      } else if (response.status === 429) {
        // Handle limit reached
        if (data.usage) {
          setUsage(data.usage);
        }
      }
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  const isContactRevealed = (contactId: string) => revealedContacts.has(contactId);

  return (
    <div className="space-y-4">
      {/* Usage Stats */}
      <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-xl p-6 border border-purple-700/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Daily Contact Views</h3>
            <p className="text-sm text-slate-400">Track your daily usage limit</p>
          </div>
          <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{usage.todayViews} / {usage.dailyLimit}</div>
              <div className="text-xs text-slate-400 mt-1">Views today</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Usage Progress</span>
            <span className="text-slate-300 font-medium">{usage.remainingViews} remaining</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                usage.hasReachedLimit ? 'bg-red-500' : usage.todayViews >= 40 ? 'bg-orange-500' : 'bg-purple-500'
              }`}
              style={{ width: `${(usage.todayViews / usage.dailyLimit) * 100}%` }}
            />
          </div>
        </div>

        {/* Limit Warning */}
        {usage.hasReachedLimit && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-red-400 font-semibold">Daily Limit Reached</h4>
              <p className="text-red-300/80 text-sm mt-1">
                You've reached your daily limit. Upgrade to view unlimited contacts.
              </p>
            </div>
            <UpgradeModal />
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>



          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="firstName">First Name</SelectItem>
              <SelectItem value="lastName">Last Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>Showing {contacts.length} of {totalCount} contacts</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch('');
              setState('');
              setSortBy('firstName');
              setPage(1);
            }}
            className="text-slate-400 hover:text-white"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800">
              <TableHead className="text-slate-300 font-semibold">Name</TableHead>
              <TableHead className="text-slate-300 font-semibold">Title</TableHead>
              <TableHead className="text-slate-300 font-semibold">Agency</TableHead>
              <TableHead className="text-slate-300 font-semibold">Contact Info</TableHead>
              <TableHead className="text-slate-300 font-semibold text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-slate-700">
                  <TableCell colSpan={5}>
                    <div className="h-16 bg-slate-700/50 animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : contacts.length === 0 ? (
              <TableRow className="border-slate-700">
                <TableCell colSpan={5} className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No contacts found</p>
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => {
                const revealed = isContactRevealed(contact.id);
                const canReveal = !usage.hasReachedLimit && !revealed;

                return (
                  <TableRow
                    key={contact.id}
                    className="border-slate-700 hover:bg-slate-700/50 transition-colors"
                  >
                    {/* Name */}
                    <TableCell className="font-medium text-white">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <Users className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold">
                            {contact.firstName} {contact.lastName}
                          </div>
                          {contact.department && (
                            <div className="text-xs text-slate-500">{contact.department}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Title */}
                    <TableCell className="text-slate-300">
                      {contact.title && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3 h-3 text-indigo-400" />
                          <span className="text-sm">{contact.title}</span>
                        </div>
                      )}
                    </TableCell>

                    {/* Agency */}
                    <TableCell className="text-slate-300">
                      {contact.agency && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3 h-3 text-cyan-400" />
                          <span className="text-sm">{contact.agency.name}</span>
                        </div>
                      )}
                    </TableCell>

                    {/* Contact Info - Blurred if not revealed */}
                    <TableCell className="text-slate-300">
                      {revealed ? (
                        <div className="space-y-1">
                          {contact.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-purple-400" />
                              <a
                                href={`mailto:${contact.email}`}
                                className="text-sm hover:text-purple-400 transition-colors"
                              >
                                {contact.email}
                              </a>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-purple-400" />
                              <a
                                href={`tel:${contact.phone}`}
                                className="text-sm hover:text-purple-400 transition-colors"
                              >
                                {contact.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-500">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm blur-sm select-none">email@example.com</span>
                        </div>
                      )}
                    </TableCell>

                    {/* Action */}
                    <TableCell className="text-center">
                      {revealed ? (
                        <span className="text-xs text-green-400 font-medium">✓ Viewed</span>
                      ) : canReveal ? (
                        <Button
                          size="sm"
                          onClick={() => handleRevealContact(contact.id)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Eye className="w-3 h-3 mr-2" />
                          Reveal
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled
                          className="bg-slate-700 cursor-not-allowed"
                        >
                          <Crown className="w-3 h-3 mr-2" />
                          Upgrade
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">Rows per page</span>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-20 bg-slate-900 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">
            Page {page} of {totalPages}
          </span>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}