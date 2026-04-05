// Shared footer block rendered on every page.
export function SiteFooter() {
  return (
    <footer className="mega-footer" data-reveal="up">
      {/* Footer brand signature. */}
      <h2 className="mega-title">Love in the Details</h2>

      {/* Footer metadata columns. */}
      <div className="footer-meta">
        <div>
          <p className="meta-k">Location</p>
          <p className="meta-v">Los Angeles, CA 90045</p>
        </div>

        <div>
          <p className="meta-k">Contact</p>
          <a className="meta-v" href="mailto:loveinthedetailsfilms@gmail.com">
            loveinthedetailsfilms@gmail.com
          </a>
        </div>

        <div>
          <p className="meta-k">Follow Us @</p>
          <div className="social-row" aria-hidden="true">
            <span className="social-dot" />
            <span className="social-dot" />
            <span className="social-dot" />
          </div>
        </div>
      </div>
    </footer>
  );
}
