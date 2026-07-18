import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black text-yellow-400">
              ResuméForge
            </h2>

            <p className="mt-5 text-gray-400 leading-8">
              Build ATS-friendly resumes with AI assistance,
              professional templates and one-click PDF export.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              Product
            </h3>

            <div className="space-y-4 text-gray-400">
              <a href="#features" className="block hover:text-yellow-400">
                Features
              </a>

              <a href="#templates" className="block hover:text-yellow-400">
                Templates
              </a>

              <a href="#ai" className="block hover:text-yellow-400">
                AI Features
              </a>

              <a href="#faq" className="block hover:text-yellow-400">
                FAQ
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-gray-400">

              <a
                href="mailto:sanor576@gmail.com"
                className="flex items-center gap-3 hover:text-yellow-400"
              >
                📧 sanor576@gmail.com
              </a>

              <a
                href="tel:+916002418878"
                className="flex items-center gap-3 hover:text-yellow-400"
              >
                📱 +91 6002418878
              </a>

              <a
                href="https://github.com/sanor07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-yellow-400"
              >
                💻 github.com/sanor07
              </a>

              <a
                href="https://www.linkedin.com/in/sano18/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-yellow-400"
              >
                💼 LinkedIn Profile
              </a>

            </div>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              Ready?
            </h3>

            <p className="text-gray-400 leading-8 mb-8">
              Start building your ATS-friendly resume today.
            </p>

            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-4 rounded-xl font-bold hover:scale-105 transition"
            >
              Start Building →
            </Link>

          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-500">
            © {new Date().getFullYear()} ResuméForge. All rights reserved.
          </p>

          <p className="text-gray-400">
            Developed with ❤️ by{" "}
            <a
              href="https://github.com/sanor07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 font-semibold hover:underline"
            >
              Sanowar Hussain
            </a>
          </p>

        </div>

      </div>
    </footer>
  );
}