import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, FileText, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-yellow-500/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-44 pb-28">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-500/10 px-5 py-2 text-yellow-300">
              <Sparkles size={18} />
              <span className="font-medium">AI Powered Resume Builder</span>
            </div>

            <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight">
              Land Your
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Dream Job
              </span>
              Faster.
            </h1>

            <p className="mt-8 max-w-xl text-xl text-gray-300 leading-9">
              Build beautiful ATS-friendly resumes in minutes using AI.
              Generate summaries, optimize experience, improve skills,
              and export professional PDFs instantly.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                to="/builder"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 font-bold text-slate-900 transition hover:scale-105"
              >
                Start Building
                <ArrowRight size={20} />
              </Link>

              <a
                href="#features"
                className="rounded-xl border border-slate-700 px-8 py-4 transition hover:bg-slate-900"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-yellow-400" />
                ATS Friendly
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-yellow-400" />
                AI Powered
              </div>
              <div className="flex items-center gap-2">
                <FileText className="text-yellow-400" />
                PDF Export
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-[520px] h-[520px] rounded-full bg-yellow-400/20 blur-[130px]" />

            <div className="absolute right-0 -top-6 z-20 rounded-2xl bg-emerald-500 px-5 py-3 text-white shadow-xl">
              <p className="text-xs opacity-80">ATS Score</p>
              <h3 className="text-2xl font-black">98%</h3>
            </div>

            <div className="absolute left-0 top-40 z-20 max-w-[220px] rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-sm font-semibold">AI Suggestion</span>
              </div>
              <p className="text-xs leading-6 text-gray-400">
                Added action verbs and optimized keywords for ATS systems.
              </p>
            </div>

            <div className="relative z-10 w-[440px] overflow-hidden rounded-3xl bg-white shadow-[0_40px_100px_rgba(0,0,0,.45)]">
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-500 p-8">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-black text-slate-900">S</div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Sanowar Hussain</h2>
                    <p className="text-slate-800">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 p-8">
                <div>
                  <h4 className="mb-3 text-sm font-bold text-slate-900">Professional Summary</h4>
                  <div className="space-y-2">
                    <div className="h-2 rounded bg-slate-200"></div>
                    <div className="h-2 rounded bg-slate-200"></div>
                    <div className="h-2 w-3/4 rounded bg-slate-200"></div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-bold text-slate-900">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React","Tailwind","Python","FastAPI","Git","SQL"].map((skill)=>(
                      <span key={skill} className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-900">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 py-4 font-bold text-slate-900 transition hover:scale-[1.02]">
                  Export Resume PDF
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
