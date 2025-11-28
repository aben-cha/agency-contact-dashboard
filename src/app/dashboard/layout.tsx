// "use client";

import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import DashboardHeader from "../components/DashboardHeader";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect=/dashboard");

  return (

    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">

      <DashboardHeader />
    
      <main className="p-6">
        <div className="flex justify-center items-center">
          {children} 
        </div>
        {/* <div>
          {children}
        </div> */}
      </main>

    </div>
  );
}