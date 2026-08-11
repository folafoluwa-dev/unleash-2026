import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useEventSettings } from '../hooks/useEventSettings';


const Hero = () => {
    const { settings } = useEventSettings();

  // Use settings if available, otherwise fallback to hardcoded defaults

  const eventName = settings?.event_name || 'UNLEASH 3.0';
  const theme = settings?.theme || 'ACCELERATE';
  const startDate = settings?.start_date || 'September 5';
  const endDate = settings?.end_date || '6, 2026';
  const time = settings?.start_time || '8:00 AM';
  const venue = settings?.venue || "King's Court Assembly";
  const address = settings?.address || 'Ojodu Berger, Lagos';
  return (
    <section className="relative bg-unleash-cream overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-unleash-orange/5 rounded-bl-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-unleash-orange/10 rounded-tr-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: main headline */}
          <div>
            <p className="text-sm md:text-base font-semibold text-unleash-orange tracking-widest uppercase mb-2">
              Love of Christ Chapel International Ministry presents
            </p>
            <h1 className="font-display text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] leading-[0.85] text-unleash-brown mb-4">
              {eventName}
              <span className="block text-unleash-orange">3.0</span>
            </h1>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-unleash-brown/90 mb-6">
              {theme}
            </h2>
            <p className="text-lg md:text-xl text-unleash-brown/80 italic border-l-4 border-unleash-orange pl-4 mb-8">
              “The hand of the Lord was on Elijah; and he girded up his loins, and ran.” <br />
              <span className="font-bold not-italic">1 Kings 18:46</span>
            </p>
          </div>

          {/* Right: key info and CTA */}
          <div className="lg:pl-10">
            <div className="space-y-5 text-unleash-brown">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-unleash-orange mt-0.5" />
                <div>
                  <p className="font-bold text-lg">{startDate}–{endDate}</p>
                  <p className="text-sm">Saturday & Sunday</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-unleash-orange mt-0.5" />
                <p className="font-bold text-lg">{time}</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-unleash-orange mt-0.5" />
                <div>
                  <p className="font-bold text-lg">{venue}</p>
                  <p className="text-sm">{address}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/register"
                className="bg-unleash-orange text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-unleash-brown transition-colors text-center"
              >
                REGISTER NOW
              </Link>
              <Link
                to="/event"
                className="border-2 border-unleash-brown text-unleash-brown px-8 py-3.5 rounded-full text-base font-bold hover:bg-unleash-brown hover:text-white transition-colors text-center"
              >
                EXPLORE EVENT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;