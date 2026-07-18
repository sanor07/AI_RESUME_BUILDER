import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              ResuméForge
            </div>
            <h2 className="mt-6 text-3xl font-black text-white">Build a better first impression.</h2>
            <p className="mt-5 text-base leading-8 text-gray-400">
              Create ATS-friendly resumes with AI guidance, modern templates, and a premium experience from start to finish.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold">Product</h3>
            <div className="space-y-4 text-gray-400">
              <a href="#features" className="block transition hover:text-yellow-400">
                Features
              </a>
              <a href="#templates" className="block transition hover:text-yellow-400">
                Templates
              </a>
              <a href="#ai" className="block transition hover:text-yellow-400">
                AI Features
              </a>
              <a href="#faq" className="block transition hover:text-yellow-400">
                FAQ
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold">Contact</h3>
            <div className="space-y-5 text-gray-400">
              <a href="mailto:sanor576@gmail.com" className="flex items-center gap-3 transition hover:text-yellow-400">
                📧 sanor576@gmail.com
              </a>
              <a href="tel:+916002418878" className="flex items-center gap-3 transition hover:text-yellow-400">
                📱 +91 6002418878
              </a>
              <a href="https://github.com/sanor07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition hover:text-yellow-400">
                💻 github.com/sanor07
              </a>
              <a href="https://www.linkedin.com/in/sano18/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition hover:text-yellow-400">
                💼 LinkedIn Profile
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold">Ready?</h3>
            <p className="mb-8 text-base leading-8 text-gray-400">
              Start building a standout resume that looks as polished as your experience.
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-4 font-bold text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(250,204,21,0.35)]"
            >
              Start Building →
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-slate-800 pt-8 text-center md:flex-row md:text-left">
          <p className="text-gray-500">© {new Date().getFullYear()} ResuméForge. All rights reserved.</p>
          <p className="text-gray-400">
            Developed with ❤️ by{" "}
            <a href="https://github.com/sanor07" target="_blank" rel="noopener noreferrer" className="font-semibold text-yellow-400 hover:underline">
              Sanowar Hussain
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}