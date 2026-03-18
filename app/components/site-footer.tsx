// Shared footer block rendered on every page.
export function SiteFooter() {
  return (
    <footer className="mega-footer">
      {/* Footer headline */}
      <h2 className="mega-title">Love in the Details</h2>

      {/* Footer metadata columns */}
      <div className="footer-meta">
        <div>
          <p className="meta-k">Location</p>
          <p className="meta-v">Los Angeles, CA 90045</p>
        </div>

        <div>
          <p className="meta-k">Contact</p>
          <p className="meta-v">loveinthedetailsfilms@gmail.com</p>
        </div>

        <div>
          <p className="meta-k">Follow Us @</p>
          <div className="social-row" aria-label="Lorem ipsum social">
            <span className="social-dot" />
            <span className="social-dot" />
            <span className="social-dot" />
          </div>
        </div>
      </div>
    </footer>
  );
}
