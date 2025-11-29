import { Sparkles } from "lucide-react";

export default function LogoMark() {
  return (
    <div className="mb-8 text-center">
      <div className="inline-flex items-center justify-center relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75" />
        <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
          <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <h1 className="mt-6 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
        AgencyHub
      </h1>
      <p className="text-slate-400 mt-2 text-sm font-medium">
        Join thousands of professionals managing agencies
      </p>
    </div>
  );
}
