import { Link } from "react-router-dom";

// Inline SVG social icons (avoids missing lucide exports)
const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const ChurchPreview = () => {
  return (
    <section className="py-16 bg-unleash-dark-brown text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-2">
          LOVE OF CHRIST CHAPEL INTERNATIONAL MINISTRY
        </h2>
        <h3 className="text-xl font-semibold text-unleash-orange mb-6">
          KING’S COURT ASSEMBLY
        </h3>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          A vibrant community of believers committed to raising a generation of
          passionate, purpose-driven youth. We are excited to welcome you to UNLEASH 3.0.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="#"
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-unleash-orange transition-colors"
            aria-label="YouTube"
          >
            <YouTubeIcon />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-unleash-orange transition-colors"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-unleash-orange transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
        <Link
          to="/church"
          className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-unleash-brown transition-colors"
        >
          LEARN MORE ABOUT THE CHURCH
        </Link>
      </div>
    </section>
  );
};

export default ChurchPreview;