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
    <section id="faq" className="relative overflow-hidden bg-slate-950 py-28 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-20 text-center">
          <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-500/10 px-4 py-2 font-semibold text-yellow-400">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Everything you need to know before you begin
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Clear answers, thoughtful guidance, and a smooth experience from first draft to final export.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[24px] border border-slate-700/60 bg-white/5 backdrop-blur-xl"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-8 py-6 text-left transition hover:bg-white/5"
                >
                  <span className="text-lg font-semibold text-white sm:text-xl">{faq.question}</span>

                  <ChevronDown
                    className={`transition duration-300 ${isOpen ? "rotate-180 text-yellow-400" : "text-gray-400"}`}
                  />
                </button>

                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-8 pb-8 text-base leading-8 text-gray-400">{faq.answer}</p>
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