'use client';

import { useState, useEffect, useCallback } from 'react';
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
  Building2,
  Phone,
  Globe,
  Users,
  School
} from 'lucide-react';

interface Agency {
  id: string;
  name: string;
  state: string | null;
  stateCode: string | null;
  type: string | null;
  population: number | null;
  totalSchools: number | null;
  totalStudents: number | null;
  phone: string | null;
  website: string | null;
  mailingAddress: string | null;
  county: string | null;
  _count: {
    contacts: number;
  };
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export function AgenciesTable() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Separate page and limit from pagination to avoid circular dependency
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch agencies
  useEffect(() => {
    const fetchAgencies = async () => {
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

        const response = await fetch(`/api/agencies?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if data has the expected structure
        if (data.error) {
          console.error('API Error:', data.error);
          return;
        }
        
        if (!data.data || !data.pagination) {
          console.error('Invalid data structure:', data);
          return;
        }

        setAgencies(data.data || []);
        setTotalCount(data.pagination?.total || 0);
        setTotalPages(data.pagination?.totalPages || 0);
      } catch (error) {
        console.error('Error fetching agencies:', error);
        setAgencies([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, [page, limit, debouncedSearch, state, sortBy, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(parseInt(newLimit));
    setPage(1); // Reset to first page when changing limit
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search agencies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          {/* State Filter */}
          {/* <Select value={state} onValueChange={setState}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value=" ">All States</SelectItem>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="FL">Florida</SelectItem>
            </SelectContent>
          </Select> */}

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="totalSchools">Total Schools</SelectItem>
              <SelectItem value="totalStudents">Total Students</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>
            Showing {agencies.length} of {totalCount} agencies
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch('');
              setState('');
              setSortBy('name');
              setSortOrder('asc');
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
              <TableHead className="text-slate-300 font-semibold">Agency</TableHead>
              <TableHead className="text-slate-300 font-semibold">Location</TableHead>
              <TableHead className="text-slate-300 font-semibold">Type</TableHead>
              <TableHead className="text-slate-300 font-semibold">Population</TableHead>
              {/* <TableHead className="text-slate-300 font-semibold">Stats</TableHead> */}
              <TableHead className="text-slate-300 font-semibold">Contacts</TableHead>
              <TableHead className="text-slate-300 font-semibold">Contact Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-slate-700">
                  <TableCell colSpan={6}>
                    <div className="h-16 bg-slate-700/50 animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : agencies.length === 0 ? (
              <TableRow className="border-slate-700">
                <TableCell colSpan={6} className="text-center py-12">
                  <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No agencies found</p>
                </TableCell>
              </TableRow>
            ) : (
              agencies.map((agency) => (
                <TableRow
                  key={agency.id}
                  className="border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  {/* Agency Name */}
                  <TableCell className="font-medium text-white">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Building2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold">{agency.name}</div>
                        {agency.county && (
                          <div className="text-xs text-slate-500">{agency.county}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Location */}
                  <TableCell className="text-slate-300">
                    {agency.state && (
                      <div className="flex items-center gap-2">
                        <span>{agency.state}</span>
                        {agency.stateCode && (
                          <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">
                            {agency.stateCode}
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>

                  {/* Type */}
                  <TableCell className="text-slate-300">
                    {agency.type && (
                      <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded">
                        {agency.type}
                      </span>
                    )}
                  </TableCell>

                <TableCell className="text-slate-300">
                    <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                      {agency.population}
                    </span>
                  </TableCell>

                  {/* Stats
                  <TableCell className="text-slate-300">
                    <div className="space-y-1">
                      {agency.totalSchools && (
                        <div className="flex items-center gap-2 text-xs">
                          <School className="w-3 h-3 text-cyan-400" />
                          <span>{agency.totalSchools.toLocaleString()} schools</span>
                        </div>
                      )}
                      {agency.totalStudents && (
                        <div className="flex items-center gap-2 text-xs">
                          <Users className="w-3 h-3 text-green-400" />
                          <span>{agency.totalStudents.toLocaleString()} students</span>
                        </div>
                      )}
                    </div>
                  </TableCell> */}

                  {/* Contacts Count */}
                  <TableCell className="text-slate-300">
                    <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                      {agency._count.contacts}
                    </span>
                  </TableCell>

                  {/* Contact Info */}
                  <TableCell className="text-slate-300">
                    <div className="flex items-center gap-2">
                      {agency.phone && (
                        <a
                          href={`tel:${agency.phone}`}
                          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                          title={agency.phone}
                        >
                          <Phone className="w-4 h-4 text-slate-400 hover:text-white" />
                        </a>
                      )}
                      {agency.website && (
                        <a
                          href={agency.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                          title="Visit website"
                        >
                          <Globe className="w-4 h-4 text-slate-400 hover:text-white" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
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