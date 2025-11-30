'use client';

import { useState } from 'react';
import { X, Crown, Check } from 'lucide-react';

export function UpgradeModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
      >
        <Crown className="w-5 h-5" />
        Upgrade Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border border-slate-700 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="p-8 text-center border-b border-slate-700">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Upgrade to Premium</h2>
              <p className="text-slate-400">Unlock unlimited contact views and more features</p>
            </div>

            {/* Pricing */}
            <div className="p-8">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-8 border border-slate-600">
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="text-5xl font-bold text-white">$25</span>
                  <span className="text-slate-400">/month</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">Unlimited contact views per day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">Advanced search and filtering</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">API access for integrations</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5" />
                  Upgrade to Premium
                </button>

                <p className="text-center text-slate-500 text-sm mt-4">
                  Cancel anytime • No payment integration for demo
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}