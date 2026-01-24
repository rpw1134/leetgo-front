export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 px-8 bg-leetgo-darkest border-t border-leetgo-muted/10 overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 235, 23, 0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main footer content - asymmetric layout */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
          {/* Left: Brand & Tagline */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-eb-garamond text-3xl font-medium text-white">
                &lt;
              </span>
              <span className="font-eb-garamond text-3xl font-medium text-white">
                Leet<span className="text-leetgo-bright">Go</span>
              </span>
              <span className="font-eb-garamond text-3xl font-medium text-white">
                /&gt;
              </span>
            </div>
            <p className="font-raleway text-white/40 text-sm leading-relaxed mb-6">
              AI-powered algorithm practice.
              <br />
              Fresh problems, every time.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="group w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all hover:border-leetgo-bright/50 hover:bg-leetgo-bright/5"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 text-white/40 group-hover:text-leetgo-bright transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="group w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all hover:border-leetgo-bright/50 hover:bg-leetgo-bright/5"
                aria-label="GitHub"
              >
                <svg
                  className="w-4 h-4 text-white/40 group-hover:text-leetgo-bright transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="group w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all hover:border-leetgo-bright/50 hover:bg-leetgo-bright/5"
                aria-label="Discord"
              >
                <svg
                  className="w-4 h-4 text-white/40 group-hover:text-leetgo-bright transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Links in a clean horizontal layout */}
          <div className="flex flex-wrap gap-x-8 gap-y-6 lg:gap-x-12 items-start">
            <div className="flex flex-col gap-3">
              <h4 className="font-raleway font-semibold text-xs uppercase tracking-wider text-white/60 mb-1">
                Connect
              </h4>
              <a
                href="#"
                className="footer-link font-raleway text-sm text-white/70 hover:text-leetgo-bright transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="footer-link font-raleway text-sm text-white/70 hover:text-leetgo-bright transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="footer-link font-raleway text-sm text-white/70 hover:text-leetgo-bright transition-colors"
              >
                Discord
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-raleway font-semibold text-xs uppercase tracking-wider text-white/60 mb-1">
                Legal
              </h4>
              <a
                href="#"
                className="footer-link font-raleway text-sm text-white/70 hover:text-leetgo-bright transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="footer-link font-raleway text-sm text-white/70 hover:text-leetgo-bright transition-colors"
              >
                Terms
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-raleway font-semibold text-xs uppercase tracking-wider text-white/60 mb-1">
                Contact
              </h4>
              <a
                href="mailto:hello@leetgo.com"
                className="footer-link font-raleway text-sm text-white/70 hover:text-leetgo-bright transition-colors"
              >
                hello@leetgo.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright - minimal */}
        <div className="pt-8 border-t border-leetgo-muted/10">
          <p className="font-raleway text-xs text-white/30 text-center lg:text-left">
            &copy; {currentYear} LeetGo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
