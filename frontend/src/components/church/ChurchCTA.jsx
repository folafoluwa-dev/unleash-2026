import { Link } from "react-router-dom";

const ChurchCTA = () => {
  return (
    <section className="py-16 bg-unleash-orange text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
          READY TO BE UNLEASHED?
        </h2>
        <p className="text-white/90 text-lg mb-6">
          Join us for UNLEASH 3.0 and be part of the next chapter.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-white font-semibold mb-8">
          <span>ACCELERATE</span>
          <span className="hidden sm:inline">•</span>
          <span>Sept 5–6, 2026</span>
          <span className="hidden sm:inline">•</span>
          <span>8:00 AM</span>
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

export default ChurchCTA;