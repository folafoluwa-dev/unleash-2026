import { Link } from "react-router-dom";
import { CheckCircle2, Calendar, Clock, MapPin } from "lucide-react";

const RegistrationSuccess = ({ registrationId }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-unleash-green" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-4">
          YOU'RE REGISTERED! 🎉
        </h2>
        <p className="text-lg text-unleash-brown/80 mb-8">
          Your registration for UNLEASH 3.0 has been received.
        </p>

        <div className="bg-unleash-cream rounded-2xl p-6 md:p-8 mb-8 inline-block w-full max-w-md">
          <p className="text-sm uppercase tracking-widest text-unleash-brown/60 mb-2">
            REGISTRATION ID
          </p>
          <p className="font-display text-2xl md:text-3xl text-unleash-brown">
            {registrationId}
          </p>
          <p className="text-xs text-unleash-brown/50 mt-2">
            Please save your registration ID for future reference.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-unleash-brown font-medium mb-8">
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

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 bg-unleash-brown text-white rounded-full font-bold hover:bg-unleash-dark-brown transition-colors"
          >
            BACK TO HOME
          </Link>
          <Link
            to="/event"
            className="px-8 py-3 border-2 border-unleash-brown text-unleash-brown rounded-full font-bold hover:bg-unleash-brown hover:text-white transition-colors"
          >
            VIEW EVENT
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSuccess;