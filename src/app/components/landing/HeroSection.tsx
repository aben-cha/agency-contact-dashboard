import Link from 'next/link'

const HeroSection = () => {
  return (
     <section className="mt-20 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-medium bg-indigo-800 text-indigo-200 px-3 py-1 rounded-full w-max">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Fast setup — ready in minutes
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Manage agencies and contacts with a delightful dashboard
            </h1>

            <p className="text-lg text-slate-300 max-w-xl">
              Authenticate with Clerk, import your agency and contact lists, and get powerful
              controls — including per-user daily view limits and upgrade prompts — all in one
              modern app.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3 mt-4">
              <Link
                href="/sign-up"
                className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition transform hover:scale-[1.02]"
                aria-label="Create an account"
              >
                Create account — it&apos;s free
              </Link>

              <Link
                href="/sign-in"
                className="flex items-center justify-center px-6 py-3 border border-slate-700 bg-slate-800 text-slate-100 rounded-xl hover:bg-slate-700 transition shadow-sm"
                aria-label="Sign in"
              >
                Sign in
              </Link>

              <a
                href="#features"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-slate-300 underline underline-offset-2 hover:text-slate-100 ml-2"
              >
                Learn more
              </a>
            </div>

            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-3">
                <div className="bg-slate-800 rounded-lg px-3 py-2 shadow">
                  <span className="text-2xl font-semibold text-white">50</span>
                </div>
                <div className="text-sm text-slate-300">
                  Free daily contact views per user
                  <div className="text-xs text-slate-400">Upgrade prompt shown after limit</div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <span className="h-px w-8 bg-slate-700" />
                <div className="text-sm text-slate-300">
                  Built with Next.js 16 • Clerk • Prisma
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="w-full max-w-md bg-gradient-to-tr from-slate-800/70 to-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 600 400"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Illustration of dashboard"
              >
                <defs>
                  <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#111827" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="600" height="400" rx="18" fill="url(#g1)" />
                <rect x="32" y="28" rx="8" width="536" height="56" fill="#0b1220" opacity="0.9" />
                <circle cx="56" cy="56" r="16" fill="#6ee7b7" />
                <rect x="88" y="44" rx="6" width="160" height="12" fill="#374151" />
                <rect x="32" y="100" rx="8" width="140" height="260" fill="#071028" opacity="0.9" />
                <rect x="52" y="120" rx="6" width="96" height="12" fill="#0f1724" />
                <rect x="52" y="144" rx="6" width="96" height="12" fill="#0b1220" />
                <rect x="52" y="168" rx="6" width="96" height="12" fill="#0f1724" />
                <rect x="190" y="100" rx="8" width="378" height="260" fill="#071028" opacity="0.98" />
                <rect x="210" y="120" rx="4" width="320" height="12" fill="#0b1220" />
                <rect x="210" y="144" rx="4" width="320" height="12" fill="#091022" />
                <rect x="210" y="168" rx="4" width="320" height="12" fill="#0b1220" />
                <rect x="210" y="192" rx="4" width="260" height="12" fill="#091022" />
                <rect x="210" y="216" rx="4" width="300" height="12" fill="#0b1220" />
              </svg>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection