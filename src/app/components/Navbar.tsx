import Link from "next/link";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const pathname = usePathname();

  return (
            <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`hidden sm:inline-block text-slate-300  px-4 py-2  rounded-lg shadow transition
            ${
                pathname === "/dashboard"
                ? "bg-indigo-700"
                : "hover:bg-indigo-700"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/contacts"
            className={`hidden sm:inline-block text-slate-300  px-4 py-2  rounded-lg shadow transition
            ${
                pathname === "/contacts"
                ? "bg-indigo-700"
                : "hover:bg-indigo-700"
            }`}
          >
            Contacts
          </Link>
          <Link
            href="/agencies"
            className={`hidden sm:inline-block text-slate-300  px-4 py-2  rounded-lg shadow transition
            ${
                pathname === "/agencies"
                ? "bg-indigo-700"
                : "hover:bg-indigo-700"
            }`}
          >
            Agencies
          </Link>
        </nav>
  )
}

export default Navbar