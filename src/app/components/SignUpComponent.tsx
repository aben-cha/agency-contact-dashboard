import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpComponent() {
  return (
    <div>
      <SignUp 
          appearance={{
            layout: {
              socialButtonsPlacement: 'top',
              showOptionalFields: false,
            },
            variables: {
              colorPrimary: '#4f46e5',
              colorBackground: '#1e293b',
              colorInputBackground: '#1e293b',
              colorInputText: '#f1f5f9',
              colorText: '#f1f5f9',
              colorTextSecondary: '#cbd5e1',
              fontSize: '1rem',
            },
            elements: {
              rootBox: 'w-full mx-auto',
            },
          }}
          forceRedirectUrl="/dashboard"
          signInUrl="/sign-in"
      />
      <p className="text-center text-slate-300 text-sm">
        Already have an account?{' '}
        <Link 
          href="/sign-in" 
          className="text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}