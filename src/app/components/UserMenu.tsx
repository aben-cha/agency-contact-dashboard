'use client';

import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export function UserMenu() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-slate-700 animate-pulse" />
      </div>
    );
  }
  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="text-sm px-3 py-2 rounded-md text-slate-300 hover:text-white transition"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Sign up
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-sm font-medium text-slate-300">
            {user?.firstName || user?.username || 'User'}
          </span>
         <UserButton
            appearance={{
          elements: {
            avatarBox: 
              'w-10 h-10 border-2 border-slate-700 hover:border-indigo-500 transition-colors',
            
            userButtonPopoverCard: 
              'bg-slate-800 border border-slate-700 shadow-xl',
            userButtonPopoverActionButton: 
              'hover:bg-slate-700 text-slate-100',
            userButtonPopoverActionButtonText: 
              'text-slate-100',
            userButtonPopoverActionButtonIcon: 
              'text-slate-400',
            userButtonPopoverFooter: 
              'hidden',
          },
        }}
          />
        </div>
      </SignedIn>
    </>
  );
}