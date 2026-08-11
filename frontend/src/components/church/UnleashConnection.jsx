import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";

const UnleashConnection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-6">
          THE HOME OF UNLEASH
        </h2>
        <p className="text-lg text-unleash-brown/80 max-w-2xl mx-auto mb-10">
          UNLEASH is a youth‑focused gathering created to bring young people together for worship, the Word, fellowship and spiritual growth.
        </p>
        <div className="inline-block bg-unleash-cream rounded-2xl p-6 md:p-8 text-left">
          <h3 className="font-display text-2xl text-unleash-brown mb-1">
            UNLEASH 3.0
          </h3>
          <p className="text-unleash-orange font-bold text-lg mb-4">ACCELERATE</p>
          <div className="space-y-2 text-unleash-brown font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-unleash-orange" />
              September 5–6, 2026
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-unleash-orange" />
              8:00 AM
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-unleash-orange" />
              King’s Court Assembly, Ojodu Berger, Lagos
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/event"
              className="inline-flex items-center gap-2 bg-unleash-orange text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors"
            >
              EXPLORE THE EVENT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnleashConnection;