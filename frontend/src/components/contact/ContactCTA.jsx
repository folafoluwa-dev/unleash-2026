import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="py-16 bg-unleash-orange text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
          READY TO JOIN US?
        </h2>
        <p className="text-white/90 text-lg mb-6">
          Secure your place at UNLEASH 3.0.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-white font-semibold mb-8">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Sept 5–6, 2026
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5" /> 8:00 AM
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5" /> King’s Court Assembly, Lagos
          </span>
        </div>
        <Link
          to="/register"
          className="inline-block bg-white text-unleash-orange px-10 py-4 rounded-full text-xl font-bold hover:bg-unleash-brown hover:text-white transition-colors"
        >
          REGISTER NOW
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;