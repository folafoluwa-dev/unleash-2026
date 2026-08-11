import { Calendar, Clock, MapPin } from "lucide-react";

const RegistrationHero = () => {
  return (
    <section className="relative bg-unleash-cream overflow-hidden py-16 md:py-20">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-unleash-orange/5 rounded-bl-[80px]" />
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <p className="text-sm md:text-base font-semibold text-unleash-orange tracking-widest uppercase mb-2">
          FREE REGISTRATION
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-unleash-brown mb-4">
          REGISTER FOR <span className="text-unleash-orange">UNLEASH 3.0</span>
        </h1>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-unleash-brown/80 mb-6">
          ACCELERATE
        </h2>
        <p className="text-lg text-unleash-brown/80 max-w-2xl mx-auto mb-8">
          Join us for two days of worship, prayer, the Word, fellowship and celebration.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-unleash-brown font-medium">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-unleash-orange" />
            Sept 5–6, 2026
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-unleash-orange" />
            8:00 AM
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-unleash-orange" />
            King’s Court Assembly, Lagos
          </span>
        </div>
      </div>
    </section>
  );
};

export default RegistrationHero;