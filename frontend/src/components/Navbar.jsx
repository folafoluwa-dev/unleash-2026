import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo/love-of-christ-logo.svg';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Event', path: '/event' },
  { name: 'Speakers', path: '/speakers' },
  { name: 'Media', path: '/media' },
  { name: 'Church', path: '/church' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Style handler for active vs inactive state
  const getLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-[#f97316] font-medium border-b-2 border-[#f97316] pb-1 transition-colors'
      : 'text-white hover:text-gray-300 font-medium transition-colors';

  return (
    <header className="w-full bg-[#1e110c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img
                src={logo}
                alt="Love Of Christ Chapel International Ministry"
                className="h-[34px] md:h-[44px] w-auto object-contain"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.path} className={getLinkStyle}>
                {item.name}
              </NavLink>
            ))}

            {/* CTA Button */}
            <NavLink
              to="/register"
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold px-5 py-2.5 rounded-md text-sm uppercase tracking-wider transition"
            >
              REGISTER NOW
            </NavLink>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {/* Mobile Navigation */}

        </div>
{isMobileMenuOpen && (
  <nav className="md:hidden pb-6">
    <div className="flex flex-col gap-4">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            `py-2 font-medium transition-colors ${
              isActive
                ? "text-[#f97316]"
                : "text-white hover:text-gray-300"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}

      <NavLink
        to="/register"
        onClick={() => setIsMobileMenuOpen(false)}
        className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold px-5 py-3 rounded-md text-sm uppercase tracking-wider text-center transition"
      >
        REGISTER NOW
      </NavLink>
    </div>
  </nav>
)}
      </div>
    </header>
  );
};

export default Navbar;