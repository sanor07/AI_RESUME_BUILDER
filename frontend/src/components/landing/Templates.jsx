import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const templates = [
  {
    name: "Professional",
    color: "from-blue-500 to-cyan-500",
    description:
      "Clean corporate design perfect for software engineers, managers and business roles.",
  },
  {
    name: "Modern",
    color: "from-yellow-400 to-orange-500",
    description:
      "Minimal, elegant layout built for today's hiring standards and ATS systems.",
  },
  {
    name: "Creative",
    color: "from-pink-500 to-purple-500",
    description:
      "Stylish resume for designers, marketers and creative professionals.",
  },
];

export default function Templates() {
  return (
    <section
      id="templates"
      className="bg-slate-950 text-white py-28"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-20">

          <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-400 text-sm font-semibold">
            RESUME TEMPLATES
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-black">
            Beautiful Resume Designs
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-8">
            Every template is modern, recruiter-friendly and ATS optimized.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {templates.map((template) => (
            <div
              key={template.name}
              className="group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-yellow-400 transition duration-300 hover:-translate-y-2"
            >

              {/* Preview */}

              <div className="relative bg-white h-[520px] p-8 overflow-hidden">

                <div
                  className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${template.color}`}
                />

                <div className="flex items-center gap-4 mb-8">

                  <div className="w-16 h-16 rounded-full bg-gray-300"></div>

                  <div className="flex-1">

                    <div className="h-4 bg-gray-300 rounded"></div>

                    <div className="h-3 bg-gray-200 rounded mt-3 w-2/3"></div>

                  </div>

                </div>

                <div className="space-y-3">

                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>

                </div>

                <div className="mt-8 h-28 rounded-xl bg-slate-100"></div>

                <div className="space-y-3 mt-8">

                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>

                </div>

                <div className="mt-8 h-28 rounded-xl bg-slate-100"></div>

              </div>

              {/* Content */}

              <div className="p-8">

                <h3 className="text-3xl font-bold">
                  {template.name}
                </h3>

                <p className="text-gray-400 mt-4 leading-8">
                  {template.description}
                </p>

                <div className="mt-8 space-y-3">

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={18}
                      className="text-green-400"
                    />
                    ATS Friendly
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={18}
                      className="text-green-400"
                    />
                    One Click PDF
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={18}
                      className="text-green-400"
                    />
                    AI Generated Content
                  </div>

                </div>

                <Link
                  to="/builder"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-yellow-400 group-hover:gap-4 transition-all"
                >
                  Use Template

                  <ArrowRight size={18} />

                </Link>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}