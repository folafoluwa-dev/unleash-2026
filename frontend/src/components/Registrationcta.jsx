import { Link } from "react-router-dom";

const RegistrationCTA = () => {
  return (
    <section className="bg-unleash-orange py-20 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
          READY TO UNLEASH?
        </h2>
        <p className="text-white/90 text-lg mb-6">
          Join us for two days of worship, the Word, prayer, fellowship and celebration.
        </p>
        <div className="flex justify-center gap-6 text-white font-semibold mb-8">
          <span>Sept 5–6, 2026</span>
          <span className="hidden sm:inline">•</span>
          <span>8:00 AM</span>
          <span className="hidden sm:inline">•</span>
          <span>King’s Court Assembly</span>
        </div>
        <Link
          to="/register"
          className="inline-block bg-white text-unleash-orange px-10 py-4 rounded-full text-xl font-bold hover:bg-unleash-brown hover:text-white transition-colors"
        >
          REGISTER FOR FREE
        </Link>
      </div>
    </section>
  );
};

export default RegistrationCTA;