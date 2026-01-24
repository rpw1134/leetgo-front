export const Footer: React.FC = () => {
  return (
    <footer className="relative py-16 px-8 bg-leetgo-darkest border-t border-leetgo-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-leetgo-bright to-leetgo-primary flex items-center justify-center">
                <span className="font-eb-garamond text-xl font-bold text-leetgo-darkest">
                  &lt;/&gt;
                </span>
              </div>
              <span className="font-eb-garamond text-2xl font-semibold text-white">
                Leet<span className="text-leetgo-bright">Go</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              AI-powered algorithm practice for the modern developer.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-raleway font-semibold text-white mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-raleway font-semibold text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-raleway font-semibold text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-leetgo-bright transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-leetgo-muted/10">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} LeetGo. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-white/30 hover:text-leetgo-bright transition-colors text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-leetgo-bright transition-colors text-sm"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
