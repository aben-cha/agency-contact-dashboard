"use client";

import { Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import { UserMenu } from './UserMenu';

const DashboardHeader = () => {
  return (
    <header className="w-full py-3 sm:py-4 md:py-6 px-4 sm:px-6 lg:px-12">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          <div className="relative group flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-2xl sm:rounded-3xl blur-md sm:blur-xl group-hover:blur-lg sm:group-hover:blur-2xl transition-all duration-500 opacity-75" />
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 whitespace-nowrap">
            AgencyHub
          </h1>
        </div>

        <div className="flex-shrink-0">
          <Navbar />
        </div>

        <div className="flex-shrink-0">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;