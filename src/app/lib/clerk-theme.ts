// lib/clerk-theme.ts
import type { Appearance } from '@clerk/types';

export const clerkAppearance: Appearance = {
  layout: {
    socialButtonsPlacement: 'top',
    socialButtonsVariant: 'blockButton',
    showOptionalFields: false,
  },
  variables: {
    // Primary brand color (indigo/purple to match your app)
    colorPrimary: '#6366f1', // indigo-500
    colorSuccess: '#10b981', // green-500
    colorWarning: '#f59e0b', // amber-500
    colorDanger: '#ef4444', // red-500
    
    // Background colors (matching slate-800/900)
    colorBackground: '#0f172a', // slate-900
    colorInputBackground: '#1e293b', // slate-800
    
    // Text colors (matching your app)
    colorText: '#f1f5f9', // slate-100
    colorTextSecondary: '#cbd5e1', // slate-300
    colorInputText: '#f1f5f9', // slate-100
    
    // Border and neutral colors
    borderRadius: '0.75rem', // rounded-xl (matching your cards)
    
    // Typography
    fontSize: '1rem',
    fontFamily: 'inherit', // Use your app's font
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 600,
    },
  },
  elements: {
    // Root container
    rootBox: 'w-full max-w-md mx-auto',
    
    // Card styling to match your app
    card: 'bg-slate-800 border border-slate-700 shadow-xl',
    
    // Header styling
    headerTitle: 'text-white font-bold',
    headerSubtitle: 'text-slate-400',
    
    // Form elements
    formButtonPrimary: 
      'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors',
    
    formFieldLabel: 'text-slate-300 font-medium',
    formFieldInput: 
      'bg-slate-700 border-slate-600 text-slate-100 focus:border-indigo-500 focus:ring-indigo-500/20',
    
    // Social buttons
    socialButtonsBlockButton: 
      'bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-100 transition-colors',
    socialButtonsBlockButtonText: 'text-slate-100 font-medium',
    
    // Footer links
    footerActionLink: 'text-indigo-400 hover:text-indigo-300',
    
    // Dividers
    dividerLine: 'bg-slate-700',
    dividerText: 'text-slate-400',
    
    // Alert styling
    alertText: 'text-slate-300',
    
    // Hide Clerk branding
    footer: 'hidden',
  },
};