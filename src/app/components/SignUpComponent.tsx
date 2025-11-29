import { SignUp } from '@clerk/nextjs';

export default function SignUpComponent() {
  return (
    <SignUp 
    appearance={{
        variables: {
        colorPrimary: '#4f46e5',
        colorBackground: '#0f172a',
        colorInputBackground: '#1e293b',
        colorInputText: '#f1f5f9',
        },
        elements: {
        rootBox: 'w-full mx-auto',
        formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
        card: 'bg-slate-900 border border-slate-700 shadow-xl',
        headerTitle: 'text-slate-100',
        headerSubtitle: 'text-slate-400',
        socialButtonsBlockButton: 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-100',
        formFieldLabel: 'text-slate-300',
        formFieldInput: 'bg-slate-800 border-slate-700 text-slate-100',
        footerActionLink: 'text-indigo-400 hover:text-indigo-300',
        identityPreviewText: 'text-slate-300',
        formFieldInputShowPasswordButton: 'text-slate-400 hover:text-slate-200',
        },
    }}
       fallbackRedirectUrl="/dashboard"
        signInUrl="/sign-in"
    />
  );
}