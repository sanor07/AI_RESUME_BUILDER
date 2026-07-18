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
    <section className="relative overflow-hidden bg-slate-900 text-white py-28">

      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-20">

          <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-400 font-semibold">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-black">
            Trusted by Professionals
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            Thousands of students and professionals use ResuméForge
            to create interview-winning resumes.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-3xl border border-slate-800 bg-slate-950 p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
            >

              <div className="absolute top-8 right-8 text-yellow-400 opacity-30 group-hover:opacity-100 transition">
                <Quote size={36} />
              </div>

              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-gray-300 leading-8">
                "{item.review}"
              </p>

              <div className="mt-10 flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold text-lg">
                  {item.name.charAt(0)}
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-400">
                    {item.role}
                  </p>

                  <p className="text-yellow-400 text-sm mt-1">
                    {item.company}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}