import { Link } from "react-router-dom";
import { Church } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-unleash-brown text-unleash-cream py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Church className="w-6 h-6" />
            <span className="font-display text-xl tracking-wide">UNLEASH 3.0</span>
          </Link>
          <p className="text-sm text-unleash-cream/70">
            Love of Christ Chapel International Ministry <br />
            King’s Court Assembly
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "Event", to: "/event" },
              { label: "Speakers", to: "/speakers" },
              { label: "Media", to: "/media" },
              { label: "Church", to: "/church" },
              { label: "Contact", to: "/contact" },
              { label: "Register", to: "/register" },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="hover:text-unleash-orange transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="font-bold mb-3">Connect</h4>
          <p className="text-sm mb-2">Ojodu Berger, Lagos</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-unleash-orange" aria-label="YouTube">
              <svg>...YouTube icon...</svg>
            </a>
            <a href="#" className="hover:text-unleash-orange" aria-label="Facebook">
              <svg>...Facebook icon...</svg>
            </a>
            <a href="#" className="hover:text-unleash-orange" aria-label="Instagram">
              <svg>...Instagram icon...</svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-unleash-cream/20 pt-6 text-center text-sm text-unleash-cream/50">
        © 2026 Love of Christ Chapel International Ministry. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;