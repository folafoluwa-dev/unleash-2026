import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_LINKS } from "../data/event.js";

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`fixed inset-0 z-60 md:hidden transition-visibility ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-brown-dark/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-[84%] max-w-sm bg-cream-light shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-brown-deep/10">
          <span className="font-display text-2xl text-brown-deep">MENU</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full text-brown-deep hover:bg-brown-deep/5 transition-colors"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="block py-3 font-display text-3xl text-brown-deep hover:text-orange-burnt transition-colors tracking-tight"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-6 py-6 border-t border-brown-deep/10">
          <Link
            to="/register"
            onClick={onClose}
            className="block w-full text-center bg-orange-burnt hover:bg-orange-gold text-cream-light font-body font-bold uppercase tracking-wide text-sm py-4 rounded-full transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
