import { Link } from "react-router-dom";
import churchLogo from '../../assets/logo/love-of-christ-logo.svg';

const ChurchHero = () => {
  return (
<section class="relative bg-unleash-cream overflow-hidden w-full">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-unleash-orange/5 rounded-bl-[80px]" />
      <div className="max-w-5xl mx-auto px-4 text-center relative">
        <img
          src={churchLogo}
          alt="Love of Christ Chapel International Ministry"
          className="h-16 md:h-20 mx-auto mb-6"
        />
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-unleash-brown mb-3">
          LOVE OF CHRIST
        </h1>
        <h2 className="font-display text-3xl sm:text-4xl text-unleash-orange mb-4">
          CHAPEL INTERNATIONAL MINISTRY
        </h2>
        <p className="text-sm md:text-base font-semibold text-unleash-brown/70 uppercase tracking-widest mb-6">
          KING'S COURT ASSEMBLY
        </p>
        <p className="text-lg text-unleash-brown/80 max-w-2xl mx-auto mb-8 italic">
          Faith. Fellowship. Purpose.
        </p>
        <Link
          to="/register"
          className="inline-block bg-unleash-orange text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-unleash-brown transition-colors"
        >
          JOIN UNLEASH 3.0
        </Link>
      </div>
    </section>
  );
};

export default ChurchHero;