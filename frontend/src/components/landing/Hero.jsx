import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, FileText, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute top-32 left-10 w-72 h-72 rounded-full bg-yellow-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]"></div>
    </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-44 pb-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-400/30 rounded-full px-4 py-2 text-yellow-300 mb-8">

              <Sparkles size={18} />

              <span>AI Powered Resume Builder</span>

            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight">

              Land Your

              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">

                Dream Job

              </span>

              Faster.

            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-9 max-w-xl">

              Build beautiful ATS-friendly resumes in minutes using AI.
              Generate summaries, improve experience, optimize skills,
              and export professional PDFs instantly.

            </p>

            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                to="/builder"
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                Start Building

                <ArrowRight size={20} />

              </Link>

              <a
                href="#features"
                className="border border-slate-700 px-8 py-4 rounded-xl hover:bg-slate-900 transition"
              >
                Explore Features
              </a>

            </div>

            <div className="flex flex-wrap gap-8 mt-14 text-gray-400">

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-yellow-400" />
                ATS Friendly
              </div>

              <div className="flex items-center gap-3">
                <Sparkles className="text-yellow-400" />
                AI Powered
              </div>

              <div className="flex items-center gap-3">
                <FileText className="text-yellow-400" />
                PDF Export
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="relative flex justify-center">

            <div className="absolute w-96 h-96 rounded-full bg-yellow-500/20 blur-3xl"></div>

            <div className="relative w-[420px] rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,.45)] overflow-hidden">

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-24 flex items-center px-8">

                <div className="w-16 h-16 rounded-full bg-white"></div>

                <div className="ml-5">

                  <div className="h-4 w-40 bg-white/80 rounded"></div>

                  <div className="h-3 w-28 bg-white/60 rounded mt-3"></div>

                </div>

              </div>

              <div className="p-8 space-y-6">

                <div>

                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded mt-3"></div>
                  <div className="h-3 bg-gray-300 rounded mt-3 w-3/4"></div>

                </div>

                <div className="h-28 bg-slate-100 rounded-xl"></div>

                <div>

                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded mt-3"></div>
                  <div className="h-3 bg-gray-300 rounded mt-3 w-2/3"></div>

                </div>

                <div className="h-28 bg-slate-100 rounded-xl"></div>

                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 py-4 rounded-xl font-bold text-slate-900">

                  Download Resume

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}