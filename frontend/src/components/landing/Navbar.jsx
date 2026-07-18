import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Features", href: "#features" },
    { name: "Templates", href: "#templates" },
    { name: "AI", href: "#ai" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <nav className="backdrop-blur-xl bg-slate-900/70 border border-slate-700 rounded-2xl shadow-2xl">
          <div className="h-20 flex items-center justify-between px-6">

            {/* Logo */}

            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 font-black text-xl">
                R
              </div>

              <div>
                <h1 className="text-white font-bold text-2xl">
                  ResuméForge
                </h1>

                <p className="text-xs text-gray-400">
                  AI Resume Builder
                </p>
              </div>
            </Link>

            {/* Desktop */}

            <div className="hidden lg:flex items-center gap-10">

              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-yellow-400 transition font-medium"
                >
                  {link.name}
                </a>
              ))}

            </div>

            <div className="hidden lg:flex items-center gap-4">

              <Link
                to="/builder"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-semibold hover:scale-105 transition"
              >
                Start Building
              </Link>

            </div>

            {/* Mobile */}

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>

          {open && (
            <div className="lg:hidden border-t border-slate-700 px-6 py-5">

              <div className="flex flex-col gap-5">

                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-gray-300"
                  >
                    {link.name}
                  </a>
                ))}

                <Link
                  to="/builder"
                  onClick={() => setOpen(false)}
                  className="mt-3 text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 py-3 rounded-xl font-semibold"
                >
                  Start Building
                </Link>

              </div>

            </div>
          )}

        </nav>
      </div>
    </header>
  );
}