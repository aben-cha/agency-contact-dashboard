'use client';

import LogoMark from '@/src/app/components/LogoMark';
import SignUpComponent from '../../components/SignUpComponent';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LogoMark />
        <SignUpComponent />
      </div>
    </div>
  );
}
