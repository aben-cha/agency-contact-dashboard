import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard App',
  description: 'Agency and Contact Management Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    //   <html lang="en">
    //     <body className={inter.className}>
    //       {children}
    //     </body>
    //   </html>
    // </ClerkProvider>
        <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#4f46e5', // indigo-600
          colorBackground: '#0f172a', // slate-900
          colorInputBackground: '#1e293b', // slate-800
          colorInputText: '#f1f5f9', // slate-100
        },
        elements: {
          formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
          card: 'bg-slate-900 border border-slate-700',
          headerTitle: 'text-slate-100',
          headerSubtitle: 'text-slate-400',
          socialButtonsBlockButton: 'bg-slate-800 border-slate-700 hover:bg-slate-700',
          formFieldLabel: 'text-slate-300',
          formFieldInput: 'bg-slate-800 border-slate-700 text-slate-100',
          footerActionLink: 'text-indigo-400 hover:text-indigo-300',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}