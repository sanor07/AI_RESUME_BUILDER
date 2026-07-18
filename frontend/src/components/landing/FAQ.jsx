import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is ResuméForge free to use?",
    answer:
      "Yes. You can build, edit, and export your resume for free. Premium features may be introduced in future releases.",
  },
  {
    question: "Are the resumes ATS-friendly?",
    answer:
      "Absolutely. Every template is designed to pass modern Applicant Tracking Systems used by recruiters.",
  },
  {
    question: "How does the AI help me?",
    answer:
      "AI generates professional summaries, improves experience descriptions, suggests missing skills, and optimizes your resume for better visibility.",
  },
  {
    question: "Can I export my resume as a PDF?",
    answer:
      "Yes. Your resume can be downloaded instantly as a clean, professional PDF.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your resume information remains private and is only used to generate your resume.",
  },
  {
    question: "Can I edit everything after AI generates content?",
    answer:
      "Yes. Every AI-generated section is fully editable before downloading your resume.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="bg-slate-950 text-white py-28"
    >
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-20">

          <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-400 font-semibold">
            FAQ
          </span>

          <h2 className="mt-6 text-5xl lg:text-6xl font-black">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Everything you need to know before creating your resume.
          </p>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"
              >

                <button
                  onClick={() =>
                    setOpen(isOpen ? -1 : index)
                  }
                  className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-slate-800 transition"
                >

                  <span className="text-xl font-semibold">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`transition duration-300 ${
                      isOpen ? "rotate-180 text-yellow-400" : ""
                    }`}
                  />

                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >

                  <div className="overflow-hidden">

                    <p className="px-8 pb-8 text-gray-400 leading-8">
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}