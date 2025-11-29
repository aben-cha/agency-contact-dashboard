"use client";

import { Sparkles } from 'lucide-react'
import { UserMenu } from './UserMenu';
import Navbar from './Navbar';

const DashboardHeader = () => {
  return (
    <header className="w-full py-6 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75" />
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
            AgencyHub
          </h1>
        </div>

        <Navbar />

        <UserMenu/>
      </header>
  )
}

export default DashboardHeader