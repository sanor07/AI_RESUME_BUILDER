import {
  Zap,
  LayoutTemplate,
  FileDown,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI Powered",
    description: "Generate professional resume content instantly.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: LayoutTemplate,
    title: "Multiple Templates",
    description: "Choose from modern ATS-friendly resume designs.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: FileDown,
    title: "PDF Export",
    description: "Download high-quality resumes with one click.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Works seamlessly on desktop, tablet and mobile.",
    color: "from-pink-500 to-rose-500",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:-translate-y-2 hover:border-yellow-400 transition-all duration-300"
              >
                <div
                  className={`absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br ${feature.color} opacity-20 blur-3xl`}
                />

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                >
                  <Icon className="text-white" size={30} />
                </div>

                <h2 className="mt-8 text-3xl font-black text-white">
                  {feature.title}
                </h2>

                <p className="mt-3 text-gray-400 text-lg">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}