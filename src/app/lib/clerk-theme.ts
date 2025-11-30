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

export const userButtonAppearance: Appearance = {
  baseTheme: undefined,
  variables: {
    colorPrimary: '#6366f1', // indigo-500
    colorBackground: '#1e293b', // slate-800 for dropdown
    colorText: '#f1f5f9', // slate-100 - WHITE text
    colorTextSecondary: '#cbd5e1', // slate-300
    colorTextOnPrimaryBackground: '#f1f5f9', // WHITE on primary
    borderRadius: '0.75rem',
  },
  elements: {
    // Root box
    rootBox: 'text-white',
    
    // Avatar styling with smooth hover effect
    avatarBox: 
      'w-10 h-10 border-2 border-slate-700 hover:border-indigo-500 transition-all duration-200 cursor-pointer shadow-md hover:shadow-indigo-500/20',
    
    // Avatar image
    avatarImage: 
      'rounded-full object-cover',
    
    // Dropdown card (menu background)
    userButtonPopoverCard: 
      'bg-slate-800 border border-slate-700 shadow-2xl rounded-xl',
    
    // Main content area
    userButtonPopoverMain: 
      'bg-slate-800 text-white',
    
    // User preview section (shows name and email)
    userPreview: 
      'text-white',
    
    userPreviewMainIdentifier: 
      'text-white font-semibold',
    
    userPreviewSecondaryIdentifier: 
      'text-slate-400 text-sm',
    
    // Menu items
    userButtonPopoverActionButton: 
      'hover:bg-slate-700 text-white transition-colors rounded-lg',
    
    userButtonPopoverActionButtonText: 
      'text-white font-medium',
    
    userButtonPopoverActionButtonIcon: 
      'text-slate-400',
    
    // Footer section
    userButtonPopoverFooter: 
      'bg-slate-800 border-t border-slate-700 hidden',
    
    // Sign out button
    userButtonPopoverActionButton__signOut: 
      'hover:bg-red-500/10 text-red-400 hover:text-red-300',
    
    // Manage account button
    userButtonPopoverActionButton__manageAccount: 
      'hover:bg-indigo-500/10 text-white',
  },
};