import { Users, FileText, Briefcase, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    value: "250K+",
    label: "Resumes Created",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Briefcase,
    value: "12K+",
    label: "Jobs Landed",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    color: "from-pink-500 to-rose-500",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:-translate-y-2 hover:border-yellow-400 transition-all duration-300"
              >
                <div
                  className={`absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-3xl`}
                />

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                >
                  <Icon className="text-white" size={30} />
                </div>

                <h2 className="mt-8 text-5xl font-black text-white">
                  {item.value}
                </h2>

                <p className="mt-3 text-gray-400 text-lg">
                  {item.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}