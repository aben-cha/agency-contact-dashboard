import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import LandingHeader from '@/src/app/components/landing/LandingHeader';
import HeroSection from '@/src/app/components/landing/HeroSection';

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <LandingHeader />
      <HeroSection />
    </main>
  );
}