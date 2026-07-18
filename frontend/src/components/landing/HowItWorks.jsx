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
    <section className="bg-slate-950 text-white py-28">
      <div className="max-w-7xl mx-auto px-6">

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

                  <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-10 hover:border-yellow-400 transition duration-300">

                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
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

                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">

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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition"
          >
            Start Building Your Resume
          </Link>

        </div>

      </div>
    </section>
  );
}