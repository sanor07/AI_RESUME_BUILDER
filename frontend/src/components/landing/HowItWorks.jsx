import { UserPlus, Sparkles, Download } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Fill in your education, skills, projects and work experience using our intuitive resume builder.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "Enhance with AI",
    description:
      "Generate summaries, improve bullet points, optimize skills and make your resume ATS-ready in seconds.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Download,
    title: "Export & Apply",
    description:
      "Download a professional PDF resume and confidently apply for your dream job.",
    color: "from-green-500 to-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-28">
        <div className="absolute inset-0">
  <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl"></div>

  <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl"></div>
</div>
      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-400 font-semibold">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-black">
            Build Your Resume in Minutes
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            Three simple steps to create a recruiter-ready,
            ATS-friendly resume.
          </p>

        </div>

        <div className="relative mt-24">

          {/* Timeline */}

          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-yellow-400 via-orange-500 to-green-500 rounded-full"></div>

          <div className="space-y-20">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    index % 2 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >

                  {/* Card */}

                 <div className="group relative overflow-hidden rounded-3xl border border-slate-700/60 bg-white/5 backdrop-blur-xl p-10 transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400 hover:shadow-[0_30px_80px_rgba(250,204,21,.18)]">
                    <div
                      className={`absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${step.color} opacity-10 blur-3xl transition group-hover:opacity-30`}
                    />

                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      <Icon className="text-white" size={34} />
                    </div>

                    <h3 className="mt-8 text-3xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-5 text-gray-400 leading-8">
                      {step.description}
                    </p>

                  </div>

                  {/* Step Number */}

                  <div className="flex justify-center">

                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_20px_60px_rgba(250,204,21,.35)]">

                      <div className="absolute inset-2 rounded-full border-2 border-white/20"></div>

                      <span className="text-6xl font-black text-slate-900">
                        {index + 1}
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        <div className="text-center mt-24">

          <Link
            to="/builder"
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-10 py-5 text-lg font-bold text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(250,204,21,.35)]"
          >
            Start Building Your Resume
          </Link>

        </div>

      </div>
    </section>
  );
}