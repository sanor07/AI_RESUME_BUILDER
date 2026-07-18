import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "TCS",
    review:
      "I built my resume in less than 20 minutes. The AI suggestions made it much more professional and I started receiving interview calls within days.",
  },
  {
    name: "Priya Singh",
    role: "UI/UX Designer",
    company: "Infosys",
    review:
      "Beautiful templates, excellent ATS compatibility, and the AI summary generator saved me hours of editing.",
  },
  {
    name: "Amit Verma",
    role: "Data Analyst",
    company: "Accenture",
    review:
      "Probably the easiest resume builder I've ever used. Clean interface and excellent PDF quality.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Trusted by professionals who value clarity and speed
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Thousands of job seekers use ResuméForge to turn their experience into polished, recruiter-ready stories.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-[28px] border border-slate-700/60 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_25px_70px_rgba(250,204,21,0.16)]"
            >
              <div className="absolute right-8 top-8 text-yellow-400 opacity-30 transition duration-500 group-hover:opacity-100">
                <Quote size={34} />
              </div>

              <div className="mb-6 flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-base leading-8 text-gray-300">
                “{item.review}”
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-lg font-black text-slate-900">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-400">{item.role}</p>
                  <p className="mt-1 text-sm font-medium text-yellow-400">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}