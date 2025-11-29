'use client';

import LogoMark from '@/src/app/components/LogoMark';
import SignInComponent from '../../components/SignInComponent';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo & Heading */}
        <LogoMark />

       <SignInComponent />
        {/* <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              rootBox: 'w-full mx-auto',
              card: 'bg-slate-800  text-white-100 shadow-2xl rounded-2xl p-6',
              headerTitle: 'text-2xl font-extrabold text-white',
              headerSubtitle: 'text-sm text-slate-300',
              form: 'mt-4',
              formField: 'mb-4',
              label: 'block text-sm text-slate-300 mb-1',
              input:
                'w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',

              socialButtonsRow: 'flex gap-2 mt-3',
              socialButton:
                'flex-1 bg-slate-200/70 border border-slate-700 text-white rounded-lg py-2 hover:bg-slate-700 transition', // whole button
              socialButtonsIcon: '', // Google/Github icons
              socialButtonsText: 'text-white font-medium', // <-- TEXT WHITE

              passwordStrength: 'text-xs text-slate-400 mt-1',
              formButtonPrimary:
                'w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow transition',
              formButtonSecondary:
                'w-full bg-transparent text-indigo-300 border border-slate-700 py-2 rounded-lg hover:bg-slate-800/60 transition',
              link: 'text-indigo-300 hover:text-indigo-200 underline underline-offset-2',
              footerAction: 'text-sm text-slate-400 mt-4',
              errorText: 'text-sm text-rose-400 mt-1',
            },
            variables: {
              colorPrimary: '#4f46e5',
              // colorText: '#ffffff',
              // colorBackground: 'bg-slate-900',
            },
          }}
        /> */}
      </div>
    </div>
  );
}
