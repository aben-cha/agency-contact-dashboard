import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { clerkAppearance } from '../lib/clerk-theme';

export default function SignInComponent() {
  return (
    <div>
    <SignIn 
        appearance={clerkAppearance}  
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