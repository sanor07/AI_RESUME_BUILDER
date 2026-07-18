import { Link } from "react-router-dom";
import {
  Sparkles,
  Brain,
  Wand2,
  FileSearch,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const features = [
  "Generate professional resume summaries",
  "Improve work experience bullet points",
  "Optimize resumes for ATS systems",
  "Suggest missing technical & soft skills",
  "Professional writing assistance",
  "Instant resume analysis",
];

export default function AISection() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-slate-900 text-white py-28"
    >
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-400 font-semibold">

              <Sparkles size={18} />

              AI Assistant

            </span>

            <h2 className="mt-6 text-5xl lg:text-6xl font-black leading-tight">

              Your Personal

              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">

                Resume Expert

              </span>

            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-400">

              Let AI transform an ordinary resume into a recruiter-ready,
              ATS-friendly professional resume within seconds.

            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">

              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 p-4"
                >
                  <BadgeCheck
                    className="text-yellow-400"
                    size={20}
                  />

                  <span>{item}</span>

                </div>
              ))}

            </div>

            <Link
              to="/builder"
              className="inline-flex items-center gap-3 mt-12 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold hover:scale-105 transition"
            >
              Try AI Builder

              <ArrowRight size={20} />

            </Link>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-white/5 backdrop-blur-xl p-8 shadow-[0_30px_80px_rgba(0,0,0,.45)]">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-400/10 blur-3xl"></div>
              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">

                  <Brain className="text-slate-900" />

                </div>

                <div>

                  <h3 className="text-2xl font-bold">
                    AI Resume Analysis
                  </h3>

                  <div className="flex items-center gap-2 text-emerald-400 font-medium">

                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>

                  Analysis Complete

                </div>

                </div>

              </div>

              <div className="space-y-6">
            <div className="mb-8 grid grid-cols-3 gap-4">

  <div className="rounded-2xl bg-slate-800 p-4 text-center">

    <p className="text-3xl font-black text-yellow-400">
      98%
    </p>

    <p className="mt-1 text-xs text-gray-400">
      ATS Score
    </p>

  </div>

  <div className="rounded-2xl bg-slate-800 p-4 text-center">

    <p className="text-3xl font-black text-green-400">
      12
    </p>

    <p className="mt-1 text-xs text-gray-400">
      Keywords
    </p>

  </div>

  <div className="rounded-2xl bg-slate-800 p-4 text-center">

    <p className="text-3xl font-black text-cyan-400">
      0
    </p>

    <p className="mt-1 text-xs text-gray-400">
      Grammar
    </p>

  </div>

</div>
                <div className="flex gap-4">

                  <Wand2 className="text-yellow-400 mt-1" />

                  <div>

                    <h4 className="font-semibold">
                      Professional Summary
                    </h4>

                    <p className="text-gray-400 mt-2">
                      AI generated recruiter-friendly summary.
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <FileSearch className="text-green-400 mt-1" />

                  <div>

                    <h4 className="font-semibold">
                      ATS Score
                    </h4>

                    <div className="mt-3 h-3 bg-slate-800 rounded-full overflow-hidden">

                      <div className="w-[92%] h-full bg-gradient-to-r from-green-400 to-green-600"></div>

                    </div>

                    <p className="mt-2 text-green-400 font-semibold">
                      92% Match
                    </p>

                  </div>

                </div>

                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/5 p-6">

                  <p className="text-yellow-400 font-semibold mb-3">
                    AI Suggestion
                  </p>

                  <p className="text-gray-300 leading-8">
                    Add measurable achievements and technical keywords to
                    significantly improve recruiter visibility.
                  </p>
<div className="mt-5 rounded-xl bg-slate-900 p-4">

  <p className="mb-2 text-xs text-gray-500">
    BEFORE
  </p>

  <p className="text-gray-400">
    Worked on multiple React projects.
  </p>

  <div className="my-4 h-px bg-slate-700"></div>

  <p className="mb-2 text-xs text-emerald-400">
    AFTER
  </p>

  <p className="text-white">
    Developed scalable React applications improving user engagement by 35%.
  </p>

</div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}