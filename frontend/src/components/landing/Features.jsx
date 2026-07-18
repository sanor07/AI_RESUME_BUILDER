import {
  Bot,
  ShieldCheck,
  FileText,
  Wand2,
  Download,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Content Generation",
    description:
      "Generate professional summaries, skills, and experience with advanced AI.",
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: ShieldCheck,
    title: "ATS Optimized",
    description:
      "Built to pass Applicant Tracking Systems used by top companies.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FileText,
    title: "Professional Templates",
    description:
      "Choose modern resume templates designed by professionals.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Wand2,
    title: "Smart Suggestions",
    description:
      "Improve your resume instantly with intelligent recommendations.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Download,
    title: "One Click PDF",
    description:
      "Download a clean, printable, ATS-friendly PDF in seconds.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Sparkles,
    title: "Career Assistant",
    description:
      "Receive AI-powered career guidance and resume improvements.",
    color: "from-purple-500 to-fuchsia-500",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative bg-slate-900 text-white py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.08),transparent_45%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-20">

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-semibold">
            FEATURES
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-black leading-tight">
            Everything You Need
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-8">
            Build professional resumes with AI-powered tools,
            ATS optimization, beautiful templates,
            and one-click export.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-700/70 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400 hover:shadow-[0_25px_60px_rgba(250,204,21,0.18)]"
              >
                <div
                  className={`absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br ${feature.color} opacity-10 blur-3xl group-hover:opacity-25 transition`}
                ></div>

                <div
                 className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                >
                  <Icon className="text-white" size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-5 text-gray-400 leading-8">
                  {feature.description}
                </p>

                <div className="mt-8 inline-flex items-center rounded-full bg-yellow-500/10 px-4 py-2 text-yellow-400 font-semibold transition group-hover:bg-yellow-500/20">
                  Learn More
                  <span className="ml-2 group-hover:translate-x-2 transition">
                    →
                  </span>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}