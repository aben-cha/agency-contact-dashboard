import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { clerkAppearance } from '../lib/clerk-theme';

export default function SignUpComponent() {
  return (
    <div>
      <SignUp 
          appearance={clerkAppearance}
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