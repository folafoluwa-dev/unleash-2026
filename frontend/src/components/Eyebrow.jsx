import AccentStripe from "./AccentStripe.jsx";

export default function Eyebrow({ children, dark = false }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <AccentStripe width={40} />
      <span
        className={`font-body font-bold text-xs sm:text-sm tracking-widest2 uppercase ${
          dark ? 'text-cream-warm/80' : 'text-orange-burnt'
        }`}
      >
        {children}
      </span>
    </div>
  );
}
