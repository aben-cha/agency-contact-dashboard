import React from "react";
import { auth } from "@clerk/nextjs/server";
import DashboardHeader from "@/src/app/components/DashboardHeader";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  return (

    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">

      <DashboardHeader />
  
      <main className="p-6">
        <div className="flex justify-center items-center">
          {children} 
        </div>
      </main>

    </div>
  );
}