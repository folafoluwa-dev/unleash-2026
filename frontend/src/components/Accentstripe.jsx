/**
 * The recurring visual signature of the site: a slanted "accelerate stripe"
 * that stands in for underlines, dividers and eyebrow markers. Two tones
 * (burnt orange + golden orange) are layered to suggest motion/heat without
 * literal flame or lightning clipart.
 */
export default function AccentStripe({ className = '', width = 64 }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-hidden="true">
      <span className="stripe bg-orange-burnt" style={{ width }} />
      <span className="stripe bg-orange-gold" style={{ width: width * 0.35 }} />
    </span>
  );
}