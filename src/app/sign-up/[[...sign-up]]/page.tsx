'use client';

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo & Heading */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75" />
            <div className="relative h-20 w-20 rounded-3xl bg-linear-to-br from-purple-500 via-indigo-500 to-cyan-500 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          <h1 className="mt-6 text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-indigo-400 to-cyan-400">
            AgencyHub
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">
            Join thousands of professionals managing agencies
          </p>
        </div>

        {/* SignUp Form */}
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: 'w-full mx-auto',
              card: 'bg-slate-800/95 text-slate-100 shadow-2xl rounded-2xl p-6',
              headerTitle: 'text-2xl font-extrabold text-white',
              headerSubtitle: 'text-sm text-slate-300',
              form: 'mt-4',
              formField: 'mb-4',
              label: 'block text-sm text-slate-300 mb-1',
              input:
                'w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
              formButtonPrimary:
                'w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow transition',
              formButtonSecondary:
                'w-full bg-transparent text-indigo-300 border border-slate-700 py-2 rounded-lg hover:bg-slate-800/60 transition',
              socialButtonsRow: 'flex gap-2 mt-3',
              socialButton:
                'flex-1 bg-slate-800/70 border border-slate-700 rounded-lg py-2 hover:bg-slate-700 transition flex items-center justify-center gap-2',
              socialButtonsText: 'text-white font-medium', // <-- ensures Google/Github text is white
              link: 'text-indigo-300 hover:text-indigo-200 underline underline-offset-2',
              footerAction: 'text-sm text-slate-400 mt-4',
              errorText: 'text-sm text-rose-400 mt-1',
            },
            variables: {
              colorPrimary: '#4f46e5', // Indigo
              // colorText: '#e6edf3',     // Lighte text
              // colorBackground: '#0f1724', // Dark slate background
            },
          }}
        />
      </div>
    </div>
  );
}
