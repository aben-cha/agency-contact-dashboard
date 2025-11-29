import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInComponent() {
  return (
    <div>
    <SignIn 
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
        signUpUrl="/sign-up"
    />
        <p className="text-center text-slate-300 text-sm">
          Don&apos;t have an account?{' '}
          <Link 
            href="/sign-up" 
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div> 
  );
}