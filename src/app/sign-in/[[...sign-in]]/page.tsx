'use client';

import LogoMark from '@/src/app/components/LogoMark';
import SignInComponent from '../../components/SignInComponent';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LogoMark />
        <SignInComponent />
      </div>
    </div>
  );
}
